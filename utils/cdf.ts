import {NetCDFReader} from 'netcdfjs'

class Cdf {
    cdfReader
    mzLen:number=0
    minMz:number=0
    maxMz:number=0
    mzArr:number[]=[]
    scanTimes:number[]=[]
    tics: number[] =[]
    nMass:number =0
    massArr:number[][]=[]
    intensityArr:number[][]=[]
    alignPeaks:number[][]=[]
    constructor(file:any) {
        this.cdfReader = new NetCDFReader(file)
    }
    async readCDF(){
        const mass_values:number[]=this.cdfReader.getDataVariable("mass_values")
        this.minMz =mass_values.length<100000?Math.floor(Math.min.apply(Math,mass_values)):10
        this.maxMz =mass_values.length<100000?Math.floor(Math.max.apply(Math,mass_values))+1:150
        this.mzArr = new Array(this.maxMz-this.minMz+1).fill(0).map((x,i)=>i+this.minMz)
        this.mzLen = this.mzArr.length
        this.tics = this.cdfReader.getDataVariable("total_intensity")
        this.scanTimes=this.cdfReader.getDataVariable('scan_acquisition_time')
        const scan_index:number[] = this.cdfReader.getDataVariable("scan_index")
        const intensity_values:number[] = this.cdfReader.getDataVariable("intensity_values")
        this.nMass = this.tics.length
        await  this.prepareData(mass_values,scan_index,intensity_values)
        await  this.get3dZ()
    }

    async prepareData(mass_values:number[], scan_index:number[], intensity_values:number[]){
        for (let i = 0; i < this.nMass; i++) {
            if(i===this.nMass-1){
                this.massArr.push(mass_values.slice(scan_index[i],))
                this.intensityArr.push(intensity_values.slice(scan_index[i],))
            }
            else {
                this.massArr.push(mass_values.slice(scan_index[i],scan_index[i+1]))
                this.intensityArr.push(intensity_values.slice(scan_index[i],scan_index[i+1]))
            }
        }
    }

    async get3dZ(){
        // 获得3d矩阵的z
        for (let i = 0; i < this.nMass; i++) {
            let singTimePeaks:number[]=new Array(this.mzLen).fill(0);
            const mass:number[] = this.massArr[i]
            const intensity:number[] = this.intensityArr[i]
            for(let j = 0 ;j<this.massArr[i].length;j++){
                const peakInd = Math.round(mass[j])-this.minMz
                singTimePeaks[peakInd] = singTimePeaks[peakInd]<intensity[j]?intensity[j]:singTimePeaks[peakInd]
            }
            if(singTimePeaks.length!==121){
                console.log(singTimePeaks.length)
            }
            this.alignPeaks.push(singTimePeaks)
        }

    }
}

export default Cdf;
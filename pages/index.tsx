import {useState,useEffect} from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import {cdfType,estType,rangeType,algOptionType} from 'utils/type'
import cdfServices from 'services/cdfSer'
import deompositionSer from 'services/decompositionSer'
import Cdf from 'utils/cdf'
import ThreePlot from '@/components/ThreePlot'
import TicPlotly from '@/components/TicPlotly'
import RangeTicPlotly from '@/components/RangeTicPlotly'
import ModalLoading from '@/components/ModalLoading'
import {ToastAlert,toastAlert,toastPag} from '@/components/ToastAlert'
import ComponentMass from '@/components/ComponentMass'
import {Drawer} from '@mui/material'
import SetAndLook from '@/components/SetAndLook'

export default function Home() {
  const [cdfData,setCdfData] =  useState<cdfType>()
  const [estList,setEstList] = useState<estType[]>([])
  const [range,setRange] = useState<rangeType>()
  const [loading,setLoading] = useState(false)
  const [file,setFile] = useState<File>()
  const [bExample,setExample] = useState(false)
  const [bDrawer,setDrawer] = useState(false)
  const [algSel,setAlgSel] = useState<algOptionType>('timeSerial')

  useEffect(() => {
    const fetchCdf = async()=>{
      try{
        setLoading(true)
        cdfServices.readCdf()
        .then(result=>setCdfData(result.data))
        .catch(err=>toastAlert(err.message))
      }
      catch(err:any){
        toastAlert(err.message)
    } 
      finally{
        setLoading(false)
        setFile(undefined)
        setEstList([])
        setRange(undefined)
      }
    }
    if(bExample){
      console.log('fetch example')
      fetchCdf()    
    }
  }, [bExample])


  const setRangeEvent=(left:number,right:number)=>{
    if(cdfData){
       const distanceLeft = cdfData.scanTimes.map(time=>Math.abs(time-left))
       const leftIdx = distanceLeft.indexOf(Math.min(...distanceLeft))
       const distanceRight = cdfData.scanTimes.map(time=>Math.abs(time-right))
       const rightIdx = distanceRight.indexOf(Math.min(...distanceRight))
       const localRange={
         leftIdx:leftIdx,
         rightIdx:rightIdx,
         left:left,
         right:right
       }
       setRange(localRange)
    }
  }

  const decompositionEvent = async()=>{
    if(cdfData&&range&&range.leftIdx&&range.rightIdx){
      try{
        const alignPeaks = cdfData?.alignPeaks.slice(range?.leftIdx,range?.rightIdx)
        const times = cdfData?.scanTimes.slice(range.leftIdx,range.rightIdx)
        const mz = cdfData?.mzArr
        const data={
          alignPeaks:alignPeaks,
          scanTimes:times,
          mzArr:mz,
        }
        const jsonData = JSON.stringify(data);
        setLoading(true)
        if(jsonData){
          const result =  await deompositionSer.decompostion({data:jsonData,algSel:algSel})
          if(result&&result.status){
            if(result.data.length===0){
              toastPag('该区域内未找到成分')
            }
            else{
              toastAlert(`该区域内共解析到${result.data.length}个成分`,{type:'success'})
            }
            setEstList(result.data)
          }
          else{
            toastAlert(result.statusText)
          }
        }
      }
      catch(err:any){
        toastAlert(err.message,{type:"error"})
      } 
      finally{
        setLoading(false)
      }
    }
  }

  const handleLoadFile = async(event:React.ChangeEvent<HTMLInputElement>)=>{
    try{
      if (!event.target.files || event.target.files.length === 0) {
        return
      }
      const file = event.target.files[0]
      setFile(file)
      setLoading(true)
      const fileReader=new FileReader()
        fileReader.readAsArrayBuffer(file)
        fileReader.onload =async(event:any)=>{
            const cdfObj=new Cdf(event.target.result)
            await cdfObj.readCDF()
            setCdfData(cdfObj)
            setLoading(false)
            setExample(false)
            setEstList([])
            setRange(undefined)
        }
    }
    catch(err:any){
      toastAlert(err.message,{type:"error"})
      setLoading(false)
    }
    

}

  const massSpectrumList = estList.map((est)=>est.massSpectrum)

  // if(!cdfData){
  //   return<></>
  // }
 
  return (
    <div >
      <Head>
        <title>InitProject</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header  */}
      <main className="p-4">
        <Header decompositionEvent={decompositionEvent} handleLoadFile={handleLoadFile} bExample={bExample} setExample={setExample} openDrawer={()=>setDrawer(true)}/>
        <div className="mt-4 border-t-blue-500 border-t-4">
          {/* 文件名 */}
          <div className="flex mx-auto mt-2">
            {file&&<p className="text-primary-color font-bold text-lg mx-auto">{file.name}</p>}
          </div>
          {/* tic rangeTic */}
          <div className="lg:grid lg:grid-cols-5 gap-8 mt-2">
          {cdfData&&
          <div className="col-span-3">
          <TicPlotly times={cdfData.scanTimes} tics={cdfData.tics} setRangeEvent={setRangeEvent} left={range?.left} right={range?.right}/>
          </div>
          }
          {cdfData&&
          <div className="col-span-2">
          <RangeTicPlotly  times={cdfData.scanTimes} tics={cdfData.tics} estList={estList} left={range?.left} right={range?.right}/>
          </div>
          }
          </div>
          <div className="lg:grid lg:grid-cols-4   gap-8 mt-4 border-t-gray-300 border-t">
            {cdfData&&
            <div className="col-span-2 border-r-gray-300 border-r">
            <ThreePlot alignPeaks={cdfData.alignPeaks} mzArr={cdfData.mzArr} times={cdfData.scanTimes} left={range?.leftIdx} right={range?.rightIdx}/>
            </div>
            }
            {massSpectrumList.length>0&&
            <div className="col-span-2">
            <ComponentMass massSpectrumList={massSpectrumList}/>
            </div>
            }
          </div>
        </div>
      </main>
      <ToastAlert/>
      <ModalLoading loading={loading}/>
      <Drawer
            open={bDrawer}
            onClose={()=>setDrawer(false)}
            anchor="right"
          >
           <SetAndLook algOption={algSel} setAlgOption={setAlgSel}/> 
          </Drawer>
    </div>
  )
}

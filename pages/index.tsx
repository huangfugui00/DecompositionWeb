import {useState,useEffect} from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import {cdfType,estType,rangeType} from 'utils/type'
import cdfServices from 'services/cdfSer'
import deompositionSer from 'services/decompositionSer'
import ThreePlot from '@/components/ThreePlot'
import TicPlotly from '@/components/TicPlotly'
import RangeTicPlotly from '@/components/RangeTicPlotly'
import ModalLoading from '@/components/ModalLoading'
import {ToastAlert,toastAlert} from '@/components/ToastAlert'
import ComponentMass from '@/components/ComponentMass'

export default function Home() {
  const [cdfData,setCdfData] =  useState<cdfType>()
  const [estList,setEstList] = useState<estType[]>([])
  const [range,setRange] = useState<rangeType>()
  const [loading,setLoading] = useState(false)
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
      }
    }
    fetchCdf()    
  }, [])


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
          const result =  await deompositionSer.decompostion({data:jsonData})
          if(result&&result.status){
            console.log(result.data)
            setEstList(result.data)
          }
          else{
            toastAlert(result.statusText)
          }
        }
      }
      catch(err:any){
        toastAlert(err.message)
      } 
      finally{
        setLoading(false)
      }
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
        <Header decompositionEvent={decompositionEvent}/>
        <div className="mt-4  p-4 border-t-blue-500 border-t-4">
          <div className="flex mx-auto">
          <p className="text-primary-color font-bold text-lg mx-auto">安捷伦六组分</p>
          </div>
          <div className="lg:grid lg:grid-cols-2 gap-8 mt-4">
          {cdfData&&
          <TicPlotly times={cdfData.scanTimes} tics={cdfData.tics} setRangeEvent={setRangeEvent} left={range?.left} right={range?.right}/>
          }
          {cdfData&&<RangeTicPlotly  times={cdfData.scanTimes} tics={cdfData.tics} estList={estList} left={range?.left} right={range?.right}/>}
          </div>
          <div className="lg:grid lg:grid-cols-2   gap-8 mt-4 ">
            {cdfData&&<ThreePlot alignPeaks={cdfData.alignPeaks} mzArr={cdfData.mzArr} times={cdfData.scanTimes} left={range?.leftIdx} right={range?.rightIdx}/>}
            
            {massSpectrumList.length>0&&<ComponentMass massSpectrumList={massSpectrumList}/>}
          </div>
        </div>
      </main>
      <ToastAlert/>
      <ModalLoading loading={loading}/>
    </div>
  )
}

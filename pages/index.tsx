import {useState,useEffect} from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import {ticType,cdfType,rangeType} from 'utils/type'
import cdfServices from 'services/cdfSer'
import ThreePlot from '@/components/ThreePlot'
import TicPlotly from '@/components/TicPlotly'
import RangeTicPlotly from '@/components/RangeTicPlotly'

export default function Home() {
  const [cdfData,setCdfData] =  useState<cdfType>()
  const [range,setRange] = useState<rangeType>()

  useEffect(() => {
    const fetchCdf = async()=>{
      const result = await cdfServices.readCdf()
      if(result.status){
        setCdfData(result.data)
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

  if(!cdfData){
    return<></>
  }
 

  return (
    <div >
      <Head>
        <title>InitProject</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header  */}
      <main className="p-4">
        <Header/>
        <div className="mt-4  p-4 border-t-blue-500 border-t-4">
          <div className="flex mx-auto">
          <p className="text-primary-color font-bold text-lg mx-auto">安捷伦六组分</p>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4">
          {cdfData&&
          <TicPlotly times={cdfData.scanTimes} tics={cdfData.tics} setRangeEvent={setRangeEvent} left={range?.left} right={range?.right}/>
          }
          {cdfData&&<RangeTicPlotly times={cdfData.scanTimes} tics={cdfData.tics} left={range?.left} right={range?.right}/>}
          </div>
          <div className="grid grid-cols-2   gap-8 mt-4 ">
            <ThreePlot alignPeaks={cdfData.alignPeaks} mzArr={cdfData.mzArr} times={cdfData.scanTimes} left={range?.leftIdx} right={range?.rightIdx}/>
          </div>  
        </div>
      </main>

     
    </div>
  )
}

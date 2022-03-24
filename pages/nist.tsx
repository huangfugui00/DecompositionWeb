import React from 'react'
import {useState,useEffect,useContext} from 'react'
import { useRouter } from "next/router";
import Layout from '@/components/Layout'
import Header from '@/components/nistCompare/Header'
import Tic from '@/components/nistCompare/Tic'
import {cdfContext,estListContext,rangeContext} from './_app'
import ThreePlot from '@/components/ThreePlot'
import RangeTicPlotly from '@/components/RangeTicPlotly'
import ComponentBar from '@/components/nistCompare/ComponentBar'
import ComponentTable from '@/components/nistCompare/ComponentTable'


const nist = () => {
    const router = useRouter()
    const {cdf,setCdf}=useContext(cdfContext)
    const {range,setRange}=useContext(rangeContext)
    const {estList,setEstList}=useContext(estListContext)
    const [selNthEst,setSelNthEst] = useState(0)

    const handleClickTableRow=(selNthEst:number)=>{ 
        setSelNthEst(selNthEst)
    }

    useEffect(() => {
        if(estList.length===0){
            router.push('/')
        }
    }, [estList])

    if(estList.length===0){
        return<></>
    }
    const selEst=estList[selNthEst]



    return (
        <div>
            <Layout>
                <main>
                    <Header/>
                    <div className=" border-t-2 mb-2    ">
                            {cdf&&<Tic times={cdf.scanTimes} tics={cdf.tics}/>}
                    </div>
                    <div className="md:flex  border-y-2">
                        <div className="md:flex-none border-r md:w-96 lg:w-[30rem]">
                            <div className='flex flex-col '>
                                {cdf&&<div className="border-b"><ThreePlot alignPeaks={cdf.alignPeaks} times={cdf.scanTimes} mzArr={cdf.mzArr} left={range?.leftIdx} right={range?.rightIdx} height={300}/></div>}
                                {cdf&&<RangeTicPlotly times={cdf.scanTimes} tics={cdf.tics} estList={estList} left={range?.left} right={range?.right}/>}
                            </div>
                        </div>
                        <div className="md:flex-1 border-r">
                            <ComponentBar selEst={selEst}/>
                        </div>
                        <div className="md:flex-none md:w-42 ">
                            <div className="grid place-content-between h-full">
                                <div>
                                    <ComponentTable estList={estList} selNthEst={selNthEst} handleClickTableRow={handleClickTableRow}/>
                                </div>
                               
                                    <button className="bg-primary-color px-4 py-1 rounded text-white">NIST比对</button>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </div>
    )
}

export default nist

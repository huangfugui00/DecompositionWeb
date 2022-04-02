import React from 'react'
import {useState,useEffect,useContext} from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";
import Layout from '@/components/Layout'
import Header from '@/components/nistCompare/Header'
import Tic from '@/components/nistCompare/Tic'
import {cdfContext,estListContext,rangeContext,nistResultsContext} from './_app'
import ThreePlot from '@/components/ThreePlot'
import RangeTicPlotly from '@/components/RangeTicPlotly'
import ComponentTable from '@/components/nistCompare/ComponentTable'
import NistResultTab from '@/components/nistCompare/NistResultTab'


const nist = () => {
    const router = useRouter()
    const {cdf,setCdf}=useContext(cdfContext)
    const {range,setRange}=useContext(rangeContext)
    const {estList,setEstList}=useContext(estListContext)
    const {nistResults,setNistResults}=useContext(nistResultsContext)
    const [selNthEst,setSelNthEst] = useState(0)

    const handleClickTableRow=(selNthEst:number)=>{ 
        setSelNthEst(selNthEst)
    }

    useEffect(() => {
        if(estList.length===0){
            router.push('/')
        }
    }, [estList])

    if(estList.length===0 || nistResults.length === 0){
        return<></>
    }
    const selEst=estList[selNthEst]
    const selEstTime = selEst.peakTimePostion
    const selNistResult = nistResults[selNthEst]

    return (
        <div>
            <Head>
                <title>Nist比对</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <main>
                    <Header/>
                    <div className=" border-t-2 mb-2    ">
                            {cdf&&<Tic times={cdf.scanTimes} tics={cdf.tics} selEstTime={selEstTime}/>}
                    </div>
                    <div className="md:flex  border-y-2">
                        <div className="md:flex-none border-r md:w-[30rem] lg:w-[40rem]">
                            <div className='flex flex-col '>
                                {cdf&&<div className="border-b"><ThreePlot alignPeaks={cdf.alignPeaks} times={cdf.scanTimes} mzArr={cdf.mzArr} left={range?.leftIdx} right={range?.rightIdx} height={300}/></div>}
                                {cdf&&<RangeTicPlotly times={cdf.scanTimes} tics={cdf.tics} estList={estList} left={range?.left} right={range?.right}/>}
                            </div>
                        </div>
                        <div className="md:flex-1 border-r">
                            <NistResultTab componentNistResult={selNistResult} selEst = {selEst}/>
                        </div>
                        <div className="md:flex-none md:w-42 ">
                            <div className="grid place-content-between h-full">
                                <div>
                                    <ComponentTable estList={estList} selNthEst={selNthEst} handleClickTableRow={handleClickTableRow}/>
                                </div>                 
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </div>
    )
}

export default nist

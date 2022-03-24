import React from 'react'
import TicPlotly from './TicPlotly'
import ThreePlot from './ThreePlot'
import {cdfType,estType,rangeType} from 'utils/type'
import RangeTicPlotly from './RangeTicPlotly'
type ModalNistPageType={
    cdfData:cdfType
    estList:estType[]
    range:rangeType
}

const ModalNistPage:React.FC<ModalNistPageType> = (props) => {
    const {cdfData,estList,range} = props
    const massSpectrumList = estList.map((est)=>est.massSpectrum)

    return (
        
        <div className="px-4 py-4 w-100%" style={{maxWidth:'1000px',width:'1920px',top:'15%' }}>
            <TicPlotly times={cdfData.scanTimes} tics={cdfData.tics} left={140} right={140.5}/>
            <div className="grid grid-cols-12">
                <div className="col-span-3">
                    <ThreePlot alignPeaks={cdfData.alignPeaks} times={cdfData.scanTimes} mzArr={cdfData.mzArr} left={range.leftIdx} right={range.rightIdx} height={300}/>
                    <RangeTicPlotly times={cdfData.scanTimes} tics={cdfData.tics} estList={estList} left={range.left} right={range.right}/>
                </div>
                <div className="col-span-7">

                </div>
                <div className="col-span-2">

                </div>

            </div>
       
        </div>
    )
}

export default ModalNistPage

import React from 'react'
import {estType,nistResultType} from 'utils/type'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });


type ComponentBarProp={
    nistResult:nistResultType
}

const ComponentMessage:React.FC<ComponentBarProp> = (props) => {
    const {nistResult} = props
    const width=90
    console.log(width)
    if(!nistResult){
        return<></>
    }
    return (
        <div>
            {/* nist result */}
            <div >
                <p className="ml-4 px-2 py-1 text-sm">名称：{nistResult.name}</p>
                <p className="ml-4 px-2 py-1 text-sm">分子式：{nistResult.formula}</p>
                <div className="flex gap-2 px-2 py-1 ml-4 text-sm">
                    <label>MF:{nistResult.MF}</label>
                    <label>RMF:{nistResult.RMF}</label>
                    <label>概率:{nistResult.pro}</label>
                    <label>CAS:{nistResult.CAS}</label>
                </div>
            </div>
            
    </div>
    )
}

export default ComponentMessage

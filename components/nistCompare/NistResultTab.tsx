import { ClassNames } from '@emotion/react'
import { Tab,Tabs} from '@mui/material'
import React,{useState} from 'react'
import {componentNistResultType,estType} from 'utils/type'
import ComponentBar from './ComponentBar'
import ComponentMessage from './ComponentMessage'

type NistResultTabProp={
    componentNistResult:componentNistResultType
    selEst:estType
}

type TabPanelProp={
    index:number,
    value:number,
    children:React.ReactNode
}

const TabPanel =({index,value,children}:TabPanelProp)=>{
    return(
        <div
        hidden={value!==index}
        >
            {children}
        </div>
    )
}

const NistResultTab:React.FC<NistResultTabProp> = (props) => {
    const {componentNistResult,selEst} = props
    const [val,setVal] = useState(0)
    return (
        <div>
            <div className="bg-gray-100">
                {
                    componentNistResult.nistResult.map((result,i)=>
                    <button onClick={()=>setVal(i)} className={`text-sm  py-1 mt-1  px-6 border rounded ${i===val?"bg-primary-color text-white":"text-gray-500 bg-slate-100"}`}>
                        {i+1}
                    </button>
                    )
                }
            </div>

            {componentNistResult.nistResult.map((result,i)=>
                <TabPanel value={val} index={i} key={i}>       
                    <ComponentMessage nistResult={result}/>
                </TabPanel>
                )}
            <ComponentBar selEst={selEst} />

        </div>
    )
}

export default NistResultTab

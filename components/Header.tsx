import React from 'react'
import Link from 'next/link'
import InputFile from '@/components/InputFile'
import SettingsIcon from '@mui/icons-material/Settings';
import {Tooltip,IconButton} from '@mui/material'

type HeaderProp={
    decompositionEvent:()=>void
    handleLoadFile:(event:React.ChangeEvent<HTMLInputElement>)=>void
    bExample:boolean
    setExample:(bExample:boolean)=>void
    openDrawer:()=>void
    bNist:boolean
    handleNistCompare:()=>void
}




const Header:React.FC<HeaderProp> = (props) => {
    const {decompositionEvent,handleLoadFile,bExample,setExample,openDrawer,bNist,handleNistCompare} = props

    return (
        <div className="flex gap-4  items-center justify-between">
            <div className="flex items-center gap-4">
            <InputFile loading={false} handleOnChange={handleLoadFile}/>
            <button className=" bg-primary-color px-4 py-1 rounded text-white" onClick={(e)=>decompositionEvent()}>解谱</button>
            {/* <Link href="/nist"> */}
                <button  className={` px-2 py-1 rounded text-white ${bNist?'bg-primary-color':'bg-gray-300'}`} disabled={!bNist}
                onClick={()=>handleNistCompare()}
                >
                    Nist比对
                </button>
            {/* </Link> */}
            {/* <button className={` px-2 py-1 rounded text-white ${bNist?'bg-primary-color':'bg-gray-300'}`} disabled={!bNist} onClick={()=>console.log(10)}>Nist比对</button> */}
            </div>
            
            <div>
            <button className={`px-4 py-1 rounded text-white cursor-pointer ${bExample?'bg-red-500':'bg-primary-color'}`} onClick={()=>setExample(!bExample)}>示例</button>

            <Tooltip title="设置">
                <IconButton  onClick={openDrawer}>
                    <SettingsIcon/>
                </IconButton>
            </Tooltip>
            </div>
        </div>
    )
}

export default Header

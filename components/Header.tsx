import React from 'react'
import InputFile from '@/components/InputFile'
import SettingsIcon from '@mui/icons-material/Settings';
import {Tooltip,IconButton} from '@mui/material'

type HeaderProp={
    decompositionEvent:()=>void
    handleLoadFile:(event:React.ChangeEvent<HTMLInputElement>)=>void
    bExample:boolean,
    setExample:(bExample:boolean)=>void
    openDrawer:()=>void
}




const Header:React.FC<HeaderProp> = (props) => {
    const {decompositionEvent,handleLoadFile,bExample,setExample,openDrawer} = props
 
    return (
        <div className="flex gap-4  items-center justify-between">
            <div className="flex items-center gap-4">
            <InputFile loading={false} handleOnChange={handleLoadFile}/>
            <button className=" bg-primary-color px-4 py-1 rounded text-white" onClick={(e)=>decompositionEvent()}>解谱</button>
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

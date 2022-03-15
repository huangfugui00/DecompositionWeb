import React from 'react'
import InputFile from '@/components/InputFile'
// import AppsIcon from '@mui/icons-material/Apps';
// import IconButton from '@mui/material/IconButton'
// import ToolTip from '@mui/material/ToolTip'

type HeaderProp={
    decompositionEvent:()=>void
    handleLoadFile:(event:React.ChangeEvent<HTMLInputElement>)=>void
    bExample:boolean,
    setExample:(bExample:boolean)=>void
}




const Header:React.FC<HeaderProp> = (props) => {
    const {decompositionEvent,handleLoadFile,bExample,setExample} = props
 
    return (
        <div className="flex gap-4  items-center justify-between">
            <div className="flex items-center gap-4">
            <InputFile loading={false} handleOnChange={handleLoadFile}/>
            <button className=" bg-primary-color px-4 py-1 rounded text-white" onClick={(e)=>decompositionEvent()}>解谱</button>
            </div>
            
            <button className={`px-4 py-1 rounded text-white cursor-pointer ${bExample?'bg-red-500':'bg-primary-color'}`} onClick={()=>setExample(!bExample)}>示例数据</button>
            {/* <ToolTip title="显示信息">
            <IconButton>
            <AppsIcon/>
            </IconButton>
            </ToolTip> */}
        </div>
    )
}

export default Header

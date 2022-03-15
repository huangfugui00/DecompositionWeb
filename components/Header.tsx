import React from 'react'
// import AppsIcon from '@mui/icons-material/Apps';
// import IconButton from '@mui/material/IconButton'
// import ToolTip from '@mui/material/ToolTip'

type HeaderProp={
    decompositionEvent:()=>void
}

const Header:React.FC<HeaderProp> = (props) => {
    const {decompositionEvent} = props
 
    return (
        <div className="flex gap-4 justify-between">
            <button className=" bg-primary-color px-4 py-1 rounded text-white" onClick={(e)=>decompositionEvent()}>解谱</button>
            {/* <ToolTip title="显示信息">
            <IconButton>
            <AppsIcon/>
            </IconButton>
            </ToolTip> */}
        </div>
    )
}

export default Header

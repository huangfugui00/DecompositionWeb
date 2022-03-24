import React from 'react'
import {ToastAlert} from './ToastAlert'
type LayoutProp={
    children:React.ReactNode,
}
const Layout:React.FC<LayoutProp> = (props) => {
    return (
        <div>
        <div className="p-4">
             {props.children}
        </div>
        <ToastAlert/>
        </div>
      
    )
}

export default Layout

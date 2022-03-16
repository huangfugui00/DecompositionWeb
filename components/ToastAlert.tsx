import React from 'react'
import { ToastContainer,toast, ToastContent } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastAlert = () => {
    return (
        <ToastContainer/>
    )
}

export const toastPag = (content:ToastContent)=>{
    return toast(content,{type:"warning"})
    
}

export const toastAlert = toast

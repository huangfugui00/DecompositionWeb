import React from 'react'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });


const BarComponent = () => {
    return (
        <div>
            
        </div>
    )
}

export default BarComponent

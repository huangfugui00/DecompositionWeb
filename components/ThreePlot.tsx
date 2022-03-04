import React from 'react'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

type ThreePlotProp={
    alignPeaks:number[][],
    times:number[],
    mzArr:number[],
    left:number | undefined,
    right:number | undefined,
}
const ThreePlot:React.FC<ThreePlotProp> = (props) => {
    const {alignPeaks,times,mzArr,left,right} = props
    console.log(left)
    console.log(right)
    let displayTimes = times
    let displayZ = alignPeaks
    if(left&&right){
        displayTimes = times.slice(left,right)
        displayZ = alignPeaks.slice(left,right)
    }
    return (
        <Plot 
        data={[
            {
                x:mzArr,
                y:displayTimes,
                z:displayZ,
                type: 'surface',    
            }
        ]}
        layout={{
            height:500,
            margin: {
                l: 5,
                r: 5,
                b: 20,
                t: 9
              },
        }}
        style={{height:'100%',width:'100%'}}
        config={
            {
                responsive:true
                
            
            }
            
        }  
    />
    )
}

export default ThreePlot

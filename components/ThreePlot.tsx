import React from 'react'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

type ThreePlotProp={
    alignPeaks:number[][],
    times:number[],
    mzArr:number[],
    left:number | undefined,
    right:number | undefined,
    height?:number
    title?:string
}
const ThreePlot:React.FC<ThreePlotProp> = (props) => {
    const {alignPeaks,times,mzArr,left,right,height,title} = props
    let displayTimes = times
    let displayZ = alignPeaks
    if(left&&right){
        displayTimes = times.slice(left,right)
        displayZ = alignPeaks.slice(left,right)
    }
    if(displayTimes.length>500){
        return(
            <div></div>
            // <div className="flex items-center justify-center">
            //     <p>所选范围太大</p>
            // </div>
        )
    }
    return (
        <Plot 
        data={[
            {
                x:mzArr,
                y:displayTimes,
                z:displayZ,
                type: 'surface',    
                xaxis:'x2s',
                showscale:true
            }
        ]}

        layout={{
            scene: {
                xaxis:{title: 'M/Z'},
                yaxis:{title: 'Time(s)'},
                zaxis:{title: 'Intensity'},
                },
            height:height?height:500,
            title:{
                text:title,    
            },
            xaxis:{
                range: [left,right],
              title: 'Time(s)',
              titlefont: {
                family: 'Arial, sans-serif',
                size: 15,
              },
            },
            yaxis:{
              title:'M/Z'
            },
            
            
        
            // showlegend:false,
            // bargap:0.1,
            margin: {
                l: 0,
                r: 0,
                b: 20,
                t: 50
              },
        }}
        style={{height:'100%',width:'100%'}}
        config={
            {
                responsive:true,
                displayModeBar: false
            }
            
        }  
    />
    )
}

export default ThreePlot

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
    let displayTimes = times
    let displayZ = alignPeaks
    if(left&&right){
        displayTimes = times.slice(left,right)
        displayZ = alignPeaks.slice(left,right)
    }
    if(displayTimes.length>500){
        return(
            <div className="flex items-center justify-center">
                <p>所选范围太大</p>
            </div>
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
                xaxis:'x2s'
            }
        ]}
        layout={{
            scene: {
                xaxis:{title: 'M/Z'},
                yaxis:{title: 'Time(s)'},
                zaxis:{title: 'Intensity'},
                },
            height:500,
            title:{
                text:'三维图',    
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
        
            margin: {
                l: 5,
                r: 5,
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

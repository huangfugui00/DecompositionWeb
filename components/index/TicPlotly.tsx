import React from 'react'
import dynamic from 'next/dynamic'
import { Alert } from '@mui/material';
import { PlotRelayoutEvent } from 'plotly.js';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });


type TicPlotlyProp={
    times:number[],
    tics:number[],
    left:number | undefined,
    right:number | undefined,
    setRangeEvent?:(left:number,right:number)=>void
}


const TicPlotly:React.FC<TicPlotlyProp> = (props) => {
    const   {left,right,times,tics,setRangeEvent} = props
    const  handleZoomEvent=(e:PlotRelayoutEvent)=>{
        const left=e['xaxis.range[0]']
        const right =e['xaxis.range[1]']
        if(left&&right&&setRangeEvent){
            setRangeEvent(left,right)
        }
    }
    const maxY = Math.max(...tics)

    return (
        <div className="h-64">
             <Plot
                onRelayout={e=>handleZoomEvent(e)}
                config={
                    {
                        staticPlot: false,
                        responsive:true,
                        scrollZoom: true,
                        displayModeBar: false,
                        
                    }
                    
                }        
                data={[
                    {
                        x: times,
                        y: tics,
                        type: 'scatter',
                        marker: {color: '#0052cc'},
                    },
                ]}
                layout={{ margin: {
                    l: 50,
                    r: 5,
                    b: 30,
                    t: 30
                  },
                  title:{
                      text:'全局TIC',    
                  },
                  xaxis:{
                    title: 'Time(s)',
                    titlefont: {
                      family: 'Arial, sans-serif',
                      size: 15,
                    //   color: 'grey'
                    },
                
                    
                  },
                  yaxis:{
                    title:'Intensity'
                  },
                  shapes:left&&right?[{
                    type: 'rect',
                    xref: 'x',
   
                    x0: left,
                    y0: 0,
                    x1: right,
                    y1: maxY,
                    fillcolor: 'gray',
                    opacity: 0.2,
                    line: {
                        width: 0
                    }
                },]:undefined
                //   xaxis: {range: [120,150]}
                }}
                style={{height:'100%',width:'100%'}}
                
            />
        </div>
            
    )
}

export default TicPlotly

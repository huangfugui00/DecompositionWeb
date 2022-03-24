import React from 'react'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

type TicPlotlyProp={
    times:number[],
    tics:number[],
}


const Tic:React.FC<TicPlotlyProp> = (props) => {
    const {times,tics} = props
    const maxY = Math.max(...tics)

    return (
        <div className="h-64">
             <Plot
                config={
                    {
                        staticPlot: true,
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
                    b: 40,
                    t: 10
                  },
             
                  xaxis:{
                    title: 'Time(s)',
                    titlefont: {
                      family: 'Arial, sans-serif',
                      size: 15,
                    },
                
                    
                  },
                  yaxis:{
                    title:'Intensity'
                  },

                  shapes:[{
                    type: 'line',
                    xref: 'x',
                    x0: 140,
                    y0: 0,
                    x1: 140,
                    y1:maxY,
                    opacity: 0.5,
                    line: {
                        width: 2,
                        color:'#b91c1c',
                        dash:'dot'

                    }
                },]
                  
                }}
                style={{height:'100%',width:'100%'}}
                
            />
        </div>
            
    )
}

export default Tic

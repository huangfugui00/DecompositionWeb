import React from 'react'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
type RangeTicPlotlyProp={
    times:number[],
    tics:number[],
    left:number|undefined,
    right:number|undefined,
}


const RangeTicPlotly:React.FC<RangeTicPlotlyProp> = (props) => {
    const {left,right,times,tics} = props
    return (
            <div className=" h-64" id="myTicDiv" >
             <Plot        
                config={
                    {
                        staticPlot: true,
                        responsive:true,
                        scrollZoom: true
                        
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
                    b: 20,
                    t: 0
                  },
                  xaxis: {range: [left,right]},
                 
                }}
                style={{height:'100%',width:'100%'}}
              
                
            />
            
        </div>
    )
}

export default RangeTicPlotly

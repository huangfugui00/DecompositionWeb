import React from 'react'
import {estType,nistResultType} from 'utils/type'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });


type ComponentBarProp={
    selEst:estType
}

const ComponentBar:React.FC<ComponentBarProp> = (props) => {
    const {selEst} = props
    
    return (
        <div>
            <Plot 
            // className="border"
                data={[
                    {
                        x:selEst.massSpectrum.x,
                        y:selEst.massSpectrum.y,
                        type: 'bar',    
                    }
                ]}
                layout={{
                    height:400,
                    margin: {
                        l: 100,
                        r: 50,
                        b: 30,
                        t:20
                    },
                   
                    xaxis:{
                      title: 'M/Z',
                      
                      titlefont: {
                        family: 'Arial, sans-serif',
                        size: 15,
                      },
                  
                      
                    },
                    yaxis:{
                      title:'RelIntensity'
                    },
                }}
                style={{width:`${90}%`}}
                config={
                    {
                        responsive:true,
                        displayModeBar: false,
                    }
                    
                }  
        />
            
        </div>
    )
}

export default ComponentBar

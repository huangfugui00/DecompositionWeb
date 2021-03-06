import React from 'react'
import dynamic from 'next/dynamic'
import { estType } from 'utils/type';
import {Data} from 'plotly.js'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
type RangeTicPlotlyProp={
    times:number[],
    tics:number[],
    estList:estType[],
    left:number|undefined,
    right:number|undefined,
    title?:string,
}

type rangeTicProp={
    x:number[],
    y:number[],
    name:string,
    line?:{dash?:string,width?:number}
}


const RangeTicPlotly:React.FC<RangeTicPlotlyProp> = (props) => {
    const {left,right,times,tics,estList,title} = props
    const rangeTic =   {
        x: times,
        y: tics,
        name:'实际TIC',
    }
    let data = [rangeTic] as rangeTicProp[]
    if(estList.length>0){
        const rangeTimes=estList[0].curve.x
        let estListCurve = estList.map((est,i)=>({x:rangeTimes,y:est.curve.y,name:`成分${i+1}` })) 
        data.push(...estListCurve)
        const rangeLen = estList[0].curve.y.length
        let fitTic = new Array(rangeLen).fill(0)
        for (let index = 0; index < rangeLen; index++) {
            for(let j = 0 ;j<estList.length;j++){
                fitTic[index] += estList[j].curve.y[index]
            }
        }
        data.push({x:rangeTimes,y:fitTic,name:'拟合TIC',line:{dash:'dot'}})
    }

  
    return (
            <div className="h-64" id="myTicDiv" >
             <Plot        
                config={
                    {
                        responsive:true,
                        scrollZoom: true,
                        displayModeBar: false,
                  }
                }        
                data={data }
                layout={{ margin: {
                    l: 50,
                    r: 5,
                    b: 30,
                    t: 30
                  },
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
                  title:'Intensity'
                },
                  
                 
                }}
                style={{height:'100%',width:'100%'}}
              
                
            />
            
        </div>
    )
}

export default RangeTicPlotly

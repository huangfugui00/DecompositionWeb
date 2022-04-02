
import {massSpectrumType} from 'utils/type'
import React,{useState} from 'react'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

type ComponentMassProp={
    massSpectrumList:massSpectrumType[]
}

type PlotListProp={
    massSpectrumList:massSpectrumType[]
}

const PlotList=({massSpectrumList}:PlotListProp)=>{
    return(
        <div>
            {
                massSpectrumList.map((massSpectrum,i)=>
                        <Plot 
                            data={[
                                {
                                    x:massSpectrum.x,
                                    y:massSpectrum.y,
                                    type: 'bar',    
                                }
                            ]}
                            layout={{
                                height:500/massSpectrumList.length,
                                margin: {
                                    l: 50,
                                    r: 5,
                                    b: 20,
                                    t: 9
                                },
                            }}
                            style={{height:'100%',width:'90%'}}
                            config={
                                {
                                    responsive:true,
                                    displayModeBar: false,  
                                }
                                
                            }  
                        />
                        )
            }
  
        </div>
      
    )
}



const ComponentMass:React.FC<ComponentMassProp> = (props) => {
    const {massSpectrumList} = props
    const [nThComponent,setNthComponent] = useState(0)
    if(massSpectrumList.length===0){
        return <></>
    }
    return (
        <div className='relative'>
            <div>
                {
                    nThComponent===-1?
                    <PlotList massSpectrumList={massSpectrumList}/>
                    :
                    <Plot 
                        data={[
                            {
                                x:massSpectrumList[nThComponent].x,
                                y:massSpectrumList[nThComponent].y,
                                type: 'bar',    
                            }
                        ]}
                        layout={{
                            height:500,
                            margin: {
                                l: 50,
                                r: 5,
                                b: 30,
                                t: 50
                            },
                            title:{
                                text:`成分谱${nThComponent+1}`,    
                            },
                            xaxis:{
                              title: 'M/Z',
                              titlefont: {
                                family: 'Arial, sans-serif',
                                size: 12,
                              },
                          
                              
                            },
                            yaxis:{
                              title:'RelIntensity'
                            },
                        }}
                        style={{height:'100%',width:'90%'}}
                        config={
                            {
                                responsive:true,
                                displayModeBar: false,
                            }
                            
                        }  
                />

                }
               
            
            </div>
      
        
            <select 
                className="absolute right-0 top-4 mt-8 py-1 pl-1 rounded text-gray-500 bg-gray-100 text-sm outline-none border focus:border-blue-200 "
                value={nThComponent}
                onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setNthComponent(parseInt(e.target.value))}
            >
                <option value={-1}>所有谱图</option>
                {
                    massSpectrumList.map((massSpectrum,i)=>
                        <option value={i} >{`成分谱图${i+1}`}</option>
                    )
                }
            </select>

    </div>
    )
}

export default ComponentMass

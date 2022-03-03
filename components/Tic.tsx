import React,{useState} from 'react'
import {
    Label,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceArea,
    ResponsiveContainer,
  } from 'recharts';
import {ticType} from 'utils/type'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

type ticProp={
  ticData:ticType[]
  left:string,
  right:string,
  setLeft:(left:string)=>void,
  setRight:(right:string)=>void
}


const initialData = [
  { name: 1, cost: 4.11, impression: 100 },
  { name: 2, cost: 2.39, impression: 120 },
  { name: 3, cost: 1.37, impression: 150 },
  { name: 4, cost: 1.16, impression: 180 },
  { name: 5, cost: 2.29, impression: 200 },
  { name: 6, cost: 3, impression: 499 },
  { name: 7, cost: 0.53, impression: 50 },
  { name: 8, cost: 2.52, impression: 100 },
  { name: 9, cost: 1.79, impression: 200 },
  { name: 10, cost: 2.94, impression: 222 },
  { name: 11, cost: 4.3, impression: 210 },
  { name: 12, cost: 4.41, impression: 300 },
  { name: 13, cost: 2.1, impression: 50 },
  { name: 14, cost: 8, impression: 190 },
  { name: 15, cost: 0, impression: 300 },
  { name: 16, cost: 9, impression: 400 },
  { name: 17, cost: 3, impression: 200 },
  { name: 18, cost: 2, impression: 50 },
  { name: 19, cost: 3, impression: 100 },
  { name: 20, cost: 7, impression: 100 },
];

  
const Tic:React.FC<ticProp> = (props) => {

    const {ticData,left,right,setLeft,setRight} = props
    const [refAreaLeft,setRefAreaLeft]  = useState<string|undefined>('')
    const [refAreaRight,setRefAreaRight]  = useState<string|undefined>('')
    console.log('ticData')
    console.log(ticData)
    const zoom = ()=>{  
      if (refAreaLeft === refAreaRight || refAreaRight === '') {
        setRefAreaLeft('')
        setRefAreaRight('')
        return;
      }
      if(refAreaRight &&refAreaLeft){
        setLeft(refAreaLeft)
        setRefAreaLeft('')
        setRefAreaRight('')
        setRight(refAreaRight)
      }
    }

    const zoomOut = ()=>{
      setLeft('')
      setRight('')
      setRefAreaLeft('')
      setRefAreaRight('')
    }

    const onMouseDown=(e:any)=>{
      setRefAreaLeft(e.activeLabel)
      setLeft('')
      setRight('')

    }


    return (
        <div >
          <div className='h-[16rem] '>
        

          
         <ResponsiveContainer width="100%" height="100%">
            <LineChart width={20} height={100} data={initialData}
            onMouseDown={(e) => onMouseDown(e)}
            onMouseMove={(e) => refAreaLeft && setRefAreaRight(e.activeLabel )}
            onMouseUp={()=>zoom()}
            >
               <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" allowDataOverflow   type="number"/>
                <YAxis />
                <Tooltip />   
                <Line type="monotone" dataKey="cost" stroke="#8884d8" activeDot={false}/>
                {refAreaLeft && refAreaRight ? (
              <ReferenceArea  x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
            ) : null}
             {left && right ? (
              <ReferenceArea  x1={left} x2={right} strokeOpacity={0.3} />
            ) : null}
            </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Tic

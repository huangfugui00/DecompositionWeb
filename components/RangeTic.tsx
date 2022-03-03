import React,{useState} from 'react'
import {ticDataType, ticType} from 'utils/type'
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
 

  type RangeTicProp={
    ticData:ticType[]
    left:string,
    right:string,
  }
    

const RangeTic :React.FC<RangeTicProp>= (props) => {
    const {ticData,left,right}=props


    return (
        <div className=' h-[16rem]'>
              <ResponsiveContainer width="100%" height="100%">
            <LineChart width={20} height={100} data={ticData}
            >
               <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" allowDataOverflow   type="number" domain={[left,right]}/>
                <YAxis />
                <Tooltip />   
                <Line type="monotone" dataKey="intensity" stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default RangeTic

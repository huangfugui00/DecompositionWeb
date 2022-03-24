import React from 'react'
import {Table ,TableBody,TableHead,TableRow,TableCell,TablePagination}from '@mui/material';
import {estType} from 'utils/type'
type ComponentTableProp={
    estList:estType[],
    selNthEst:number,
    handleClickTableRow:(selNthEst:number)=>void, 
}

const ComponentTable:React.FC<ComponentTableProp> = (props) => {
    const {estList,selNthEst,handleClickTableRow} = props
    return (
        <div>
            <Table size="small"> 
                <TableHead>
                    <TableRow>
                        <TableCell className="border-r font-bold ">序号</TableCell>
                        <TableCell className="border-r font-bold ">析出时间(s)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {estList.map((est,index)=>
                    <TableRow key={est.peakTimePostion} className={`text-sm ${selNthEst===index?'bg-primary-color text-gray-100':index%2 && 'bg-second-color'}   cursor-pointer`}
                    onClick={()=>handleClickTableRow(index)}
                    >
                        <TableCell  sx={{color:`${selNthEst===index?'white':'gray'}`}}>{index+1}</TableCell>
                        
                        <TableCell sx={{color:`${selNthEst===index?'white':'gray'}`}} className="border-r">{Math.round(est.peakTimePostion * 10000) / 10000}</TableCell>
                    </TableRow>
                    )}
                    
                </TableBody>
            </Table>
        </div>
    )
}

export default ComponentTable

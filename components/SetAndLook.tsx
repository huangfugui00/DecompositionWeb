import React from 'react'
import TimelineIcon from '@mui/icons-material/Timeline';
import PlayDisabledIcon from '@mui/icons-material/PlayDisabled';
import {algOptionType} from 'utils/type'

type SetAndLookProp={
    algOption:algOptionType
    setAlgOption:(algOption:algOptionType)=>void
}

const SetAndLook :React.FC<SetAndLookProp>= (props) => {
    const {algOption,setAlgOption } = props

    return (
        <div className="w-64 ">
            {/* set  */}
            <div>
                <h2 className="text-xl px-4 py-4 border-b">设置</h2>
                {/* 算法 */}
                <div className="px-4 mt-4 ">
                    <p className="text-sm text-gray-500">算法</p>
                    <div className="grid grid-cols-2 mt-2">
                        <button 
                        className={`border rounded-l py-1 ${algOption==='timeSerial' && 'bg-gray-100 border-primary-color'}`}
                        onClick={()=>setAlgOption('timeSerial')}
                        >
                            <TimelineIcon color={`${algOption==='timeSerial' ? 'primary':'disabled'}`}/>
                            <span className={`px-2  text-gray-500 text-sm ${algOption==='timeSerial' ? 'text-blue-500':'text-gray-500'}`}>时序</span>
                        </button>
                        <button
                         className={`border rounded-l py-1 ${algOption==='similarity' && 'bg-gray-100 border-primary-color'}`}
                         onClick={()=>setAlgOption('similarity')}
                         >    
                             <PlayDisabledIcon color={`${algOption==='similarity' ? 'primary':'disabled'}`}/>
                             <span className={`px-2  text-gray-500 text-sm ${algOption==='similarity' ? 'text-blue-500':'text-gray-500'}`}>相似性</span>
                        </button>
                    </div>

                </div>

            </div>
            {/* look */}
            <div>

            </div>
            
        </div>
    )
}

export default SetAndLook

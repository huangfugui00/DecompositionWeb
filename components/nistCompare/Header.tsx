import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {Tooltip,IconButton} from '@mui/material'
import Link from 'next/link'

const Header = () => {
    return (
        <div className="flex gap-4  items-center justify-end">
            {/* <div className="flex items-center gap-4">
                <button className=" bg-primary-color px-4 py-1 rounded text-white" >Nist匹配</button>
            </div>
             */}
            <div>
                <Link href='/'  >
                    <IconButton >
                        <CloseIcon fontSize='large'/>
                    </IconButton>
                </Link>
            </div>
    </div>
    )
}

export default Header

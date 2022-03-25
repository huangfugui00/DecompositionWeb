import React from 'react'
import {componentNistResultType} from 'utils/type'

type compareBarProp={
    nistResult:componentNistResultType
}

const compareBar:React.FC<compareBarProp> = (props) => {
    const {nistResult} = props
    return (
        <div>
            
        </div>
    )
}

export default compareBar

import React ,{useState,useEffect} from 'react'
import MyModal from './MyModal'
import Loading from './Loading'

type modalLoadingProp={
    loading:boolean
}

const ModalLoading = ({loading}:modalLoadingProp) => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(loading)
    }, [loading])
    return (
        <div>
            {/* <p>{modalload}</p> */}
            <MyModal open={open} handleClose={()=>setOpen(false)}>
                <Loading loading={loading} size={100}/>
            </MyModal>
        </div>
    )
}

export default ModalLoading

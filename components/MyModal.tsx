import React from 'react'
import Modal from '@mui/material/Modal';

type modalVideoProp= {
 open:boolean,
 handleClose:()=>void,   
 children:React.ReactNode
}
const MyModal = ({open, handleClose,children}:modalVideoProp) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
        <div>
          {children}
        </div>
        </Modal>
    )
}

export default MyModal

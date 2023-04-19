import { createPortal } from 'react-dom';
import "../styles/modal.css"


function Modal(props) {
  return createPortal(
    <div className='ModalBackground'>
      {props.children}  
    </div>
    ,
    document.getElementById("modal")
  )
}

export default Modal
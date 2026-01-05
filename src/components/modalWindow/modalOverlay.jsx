import {useEffect} from 'react'
import styles from './modal.module.css'
function ModalOverlay ({onClose}){
   useEffect(()=>{

    function handleKeyCloseModal(e){
      if (e.key === 'Escape'){
        onClose();
      }
    }
    document.addEventListener('keydown',handleKeyCloseModal);
    document.body.style.overflow = 'hidden';
    return() =>{
      document.removeEventListener('keydown', handleKeyCloseModal);
      document.body.style.overflow = 'unset';
    }
   },[onClose])

  return <div className={styles.overlay} onClick={onClose}></div>;
}

export default ModalOverlay


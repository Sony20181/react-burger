import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import ModalOverlay from './modalOverlay';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
function Modal ({onClose,children}){
    const modalRoot = document.getElementById('modalWindow')
    //onClose={onClose}
    console.log(children,"children");
    return ReactDOM.createPortal(
            (
                <>
                    <ModalOverlay onClose={onClose}/>
                    <div className={styles.modal}>
                        <div className={styles.header}>
                            <button 
                                className={styles.closeButton} 
                                onClick={onClose}
                                type="button"
                                aria-label="Закрыть"
                            >
                                <CloseIcon type="primary" />
                            </button>
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>
                </>
            

            ), 
            modalRoot
        );

}

export default Modal
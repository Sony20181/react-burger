import ReactDOM from 'react-dom';
import ModalOverlay from './modalOverlay';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
function Modal ({title,onClose,children}){
    const modalRoot = document.getElementById('modalWindow')
    //onClose={onClose}
    console.log(children,"children");
    return ReactDOM.createPortal(
            (
                <>
                    <ModalOverlay onClose={onClose}/>
                    <div className={`${styles.modal }`}>
                        <div className={`${styles.header} ${!title ? styles.headerWithoutTitle : ''} pl-10 pr-10 pt-10`}>
                            {title && (
                                <h1 className={`${styles.title }`}>{title}</h1>
                            )}
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
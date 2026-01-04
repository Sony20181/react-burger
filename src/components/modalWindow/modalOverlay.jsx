import PropTypes from "prop-types";
import styles from './modal.module.css'
function ModalOverlay ({onClose}){

  return <div className={styles.overlay} onClick={onClose}></div>;
}

export default ModalOverlay

/*
ModalOverlay.prototype = {
    onClose: PropTypes.function.isRequired
}*/
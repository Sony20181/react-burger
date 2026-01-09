import ReactDOM from "react-dom";
import ModalOverlay from "./modalOverlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from "prop-types";

function Modal({ title, onClose, children }) {
  const modalRoot = document.getElementById("modalWindow");
  useEffect(() => {
    function handleKeyCloseModal(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyCloseModal);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyCloseModal);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.modal}`}>
        <div
          className={`${styles.header} ${
            !title ? styles.headerWithoutTitle : ""
          } pl-10 pr-10 pt-10`}
        >
          {title && <h1 className={`${styles.title}`}>{title}</h1>}
          <button
            className={styles.closeButton}
            onClick={onClose}
            type="button"
            aria-label="Закрыть"
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </>,

    modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;

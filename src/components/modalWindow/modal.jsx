import ReactDOM from "react-dom";
import ModalOverlay from "./modalOverlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { clearCurrentIngredient } from "../../services/slices/ingredientDetailsSlice";

function Modal({ title, onClose, children }) {
  const modalRoot = document.getElementById("modalWindow");
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(clearCurrentIngredient());
    onClose();
  }, [dispatch, onClose]);

  useEffect(() => {
    function handleKeyCloseModal(e) {
      if (e.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", handleKeyCloseModal);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyCloseModal);
      document.body.style.overflow = "unset";
    };
  }, [handleClose]);

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
            onClick={handleClose}
            type="button"
            aria-label="Закрыть"
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </>,

    modalRoot,
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;

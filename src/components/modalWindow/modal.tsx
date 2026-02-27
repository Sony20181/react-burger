import ReactDOM from "react-dom";
import { ModalOverlay } from "./modalOverlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useCallback, FC, ReactNode } from "react";

type ModalProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};
export const Modal: FC<ModalProps> = ({ title, onClose, children }) => {
  const modalRoot = document.getElementById("modalWindow");

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    function handleKeyCloseModal(e: KeyboardEvent) {
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

  if (!modalRoot) {
    console.error("Modal root element not found");
    return null;
  }

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
};

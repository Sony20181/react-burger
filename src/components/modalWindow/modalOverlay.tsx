import styles from "./modal.module.css";
import { FC } from "react";

type ModalOverlayProps = {
  onClose: () => void;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};

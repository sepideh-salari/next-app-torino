import { useEffect, useRef } from "react";
import styles from "./ModalContainer.module.css";

function ModalContainer({ children, isOpen, setIsOpen }) {
  const modalRef = useRef(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Close modal when clicking outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClickOutside}>
      <div ref={modalRef} className={styles.modalContent}>
        <button
          onClick={() => setIsOpen(false)}
          className={styles.closeButton}
          aria-label="Close modal"
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
}

export default ModalContainer;

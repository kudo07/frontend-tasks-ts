import { useEffect, type ReactNode } from 'react';
import ReactDOM from 'react-dom';
export type ModalSize = 'sm' | 'md' | 'lg' | 'auto';
import styles from './Modal.module.css';
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;

  //   behaviour
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;

  //   layout
  size?: ModalSize;
  centered?: boolean;

  //   styling hooks
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;

  //   style overrides
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}
const modalRootId = 'modal-root';

function getModalRoot(): HTMLElement {
  let root = document.getElementById('div');
  if (!root) {
    root = document.createElement('div');
    root.id = modalRootId;
    document.body.appendChild(root);
  }
  return root;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  size = 'auto',
  centered = true,
  className,
  overlayClassName,
  contentClassName,
  overlayStyle,
  contentStyle,
}) => {
  const modalRoot = getModalRoot();
  useEffect(() => {
    if (!isOpen || !closeOnEsc) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${overlayClassName} ?? ""}`}
      style={overlayStyle}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={
          `${styles.modal} ${styles[size]} ${
            centered ? styles.centered : ''
          } ` + `${className ?? ''}`
        }
        style={contentStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <header className={styles.header}>
            <h2>{title}</h2>
            <button className={styles.closeBtn} onClick={onClose}>
              ×
            </button>
          </header>
        )}
        <section className={`${styles.content} ${contentClassName ?? ''}`}>
          {children}
        </section>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

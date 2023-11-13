import { ReactNode, useEffect, FC } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import modalStyles from './Modal.module.css';

interface Props {
  title: string;
  closeModal: () => void;
  children: ReactNode;
}

const Modal: FC<Props> = ({ title, children, closeModal }) => {
  const modalRoot = document.getElementById('modals');

  useEffect(() => {
    function closeByEscape(evt: globalThis.KeyboardEvent) {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, []);

  return createPortal(
    <div>
      <div className={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={modalStyles.header}>
          <h2 className='text text_type_main-medium'>{title}</h2>
          <button className={modalStyles.closeButton} onClick={closeModal}>
            <CloseIcon type='primary' />
          </button>
        </header>
        <main className={modalStyles.content}>{children}</main>
      </div>
      <ModalOverlay closeModal={closeModal} />
    </div>,
    modalRoot!
  );
}

export default Modal;

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modalOverlay/modalOverlay';

function Modal({ title, children, setIsOpen }) {
  const modalRoot = document.getElementById('modals');

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleKeyDown = () => {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    });
    return document.removeEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    });
  };

  useEffect(() => {
    handleKeyDown();
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
      <ModalOverlay setIsOpen={setIsOpen} />
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Modal;

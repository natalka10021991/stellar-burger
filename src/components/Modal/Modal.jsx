import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

function Modal({ title, children, closeModal }) {
  const modalRoot = document.getElementById('modals');

  useEffect(() => {
    function closeByEscape(evt) {
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
    modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  // setIsOpen: PropTypes.func.isRequired,
};

export default Modal;

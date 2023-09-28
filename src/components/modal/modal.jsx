import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';

function Modal({ title, children, setIsOpen }) {
  const handleClick = () => {
    setIsOpen(false);
  };
  return (
    <div className={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
      <header className={modalStyles.header}>
        <h2 className='text text_type_main-medium'>{title}</h2>
        <button className={modalStyles.closeButton} onClick={handleClick}>
          <CloseIcon type='primary' />
        </button>
      </header>
      <main className={modalStyles.content}>{children}</main>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  setIsOpen: PropTypes.func
};

export default Modal;

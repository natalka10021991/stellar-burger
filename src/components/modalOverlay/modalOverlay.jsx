import PropTypes from 'prop-types';
import modalOverlayStyles from './modalOverlay.module.css';

function ModalOverlay({ setIsOpen }) {
  const handleClick = () => {
    setIsOpen(false);
  };

  return <div className={modalOverlayStyles.modalOverlay} onClick={handleClick} />;
}

ModalOverlay.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default ModalOverlay;

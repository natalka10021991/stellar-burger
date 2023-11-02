import PropTypes from 'prop-types';

import modalOverlayStyles from './ModalOverlay.module.css';

function ModalOverlay({ closeModal }) {

  const handleClick = () => {
    closeModal();
  };

  return <div className={modalOverlayStyles.modalOverlay} onClick={handleClick} />;
}

ModalOverlay.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default ModalOverlay;

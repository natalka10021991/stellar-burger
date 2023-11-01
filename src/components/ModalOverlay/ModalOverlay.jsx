import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import modalOverlayStyles from './ModalOverlay.module.css';

function ModalOverlay({ setIsOpen }) {
  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(false);
    navigate('/');
  };

  return <div className={modalOverlayStyles.modalOverlay} onClick={handleClick} />;
}

ModalOverlay.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default ModalOverlay;

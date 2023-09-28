import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import modalOverlayStyles from './modalOverlay.module.css';


function ModalOverlay({ title, children, setIsOpen }) {
  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={modalOverlayStyles.modalOverlay} onClick={handleClick}>
      <Modal title={title} children={children} setIsOpen={setIsOpen} />
    </div>
  );
}

ModalOverlay.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  setIsOpen: PropTypes.func
};

export default ModalOverlay;

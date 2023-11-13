import { FC } from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';

interface Props {
  closeModal: () => void;
}

const ModalOverlay: FC<Props> = ({ closeModal }) => {
  const handleClick = () => {
    closeModal();
  };

  return <div className={modalOverlayStyles.modalOverlay} onClick={handleClick} />;
};

export default ModalOverlay;

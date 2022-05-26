import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');
export default function Modal({ onClose, src }) {
  useEffect(() => {
    window.addEventListener('keydown', onKeydovnCloseModal);
    return () => window.removeEventListener('keydown', onKeydovnCloseModal);
  });

  const onKeydovnCloseModal = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const onBackdropClickCloseModal = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Modal__backdrop} onClick={onBackdropClickCloseModal}>
      <img className={s.Modal__content} src={src} alt="asfdsfdsf" />
    </div>,
    modalRoot
  );
}
Modal.propTypes = {
  src: PropTypes.string,
  onClose: PropTypes.func,
};

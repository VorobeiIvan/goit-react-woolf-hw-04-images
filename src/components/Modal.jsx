import React, { useEffect } from 'react';

const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyPress = event => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={src} alt={alt} />
        <button type="button" onClick={onClose}>
          Close modal
        </button>
      </div>
    </div>
  );
};

export default Modal;

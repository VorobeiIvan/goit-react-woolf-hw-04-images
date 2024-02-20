import React, { useEffect } from 'react';

const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
  }, []);

  const handleKeyPress = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

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

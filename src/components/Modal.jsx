import React, { useEffect } from 'react';

const Modal = ({ handleClose, show, children }) => {
  useEffect(() => {
    const handleKeyPress = event => {
      if (event.keyCode === 27) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleClose]);

  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">{children}</section>
    </div>
  );
};

export default Modal;

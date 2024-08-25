import React, { useEffect, useState } from 'react';
import './modal.css';

const Modal = ({ isOpen, isClose, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      isClose(false);
    }, 300); // Match the duration of the animation
  };

  return (
    <div
      className={`modal-backdrop ${isAnimating ? 'modal-open' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`modal-content ${isAnimating ? 'modal-open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal-close" onClick={handleClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { motion, AnimatePresence } from 'framer-motion';
import './modal.css';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalTransition = {
    duration: 0.3
  };

  const overlayTransition = {
    duration: 0.2
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <style>
            {`
              html {
                overflow: hidden;
              }
            `}
          </style>
          <FaTimes size={38} className="btn-close" onClick={onClose} />
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={overlayTransition}
            onClick={onClose}
            className="overlay"
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={modalTransition}
            className="modal-content"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info", // 'info', 'success', 'warning', 'error', 'confirm'
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  showCancel = false,
  children, // Support for custom content
  hideDefaultContent = false, // Hide default icon/message layout
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-5xl text-green-500" />;
      case "warning":
      case "confirm":
        return <FaExclamationTriangle className="text-5xl text-yellow-500" />;
      case "error":
        return <FaExclamationTriangle className="text-5xl text-red-500" />;
      case "info":
      default:
        return <FaInfoCircle className="text-5xl text-blue-500" />;
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#7E22CE] to-[#14B8A6] px-6 py-4">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
                {title && (
                  <h3 className="text-xl font-inter font-bold text-white pr-8">
                    {title}
                  </h3>
                )}
              </div>

              {/* Body */}
              <div className="px-6 py-8">
                {children ? (
                  // Custom content
                  <div>{children}</div>
                ) : hideDefaultContent ? null : (
                  // Default content with icon and message
                  <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                      className="mb-4"
                    >
                      {getIcon()}
                    </motion.div>

                    {/* Message */}
                    <p className="text-gray-700 font-instrument text-lg leading-relaxed">
                      {message}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer - Only show if not using custom children */}
              {!children && (
                <div className="px-6 pb-6">
                  <div className="flex gap-3">
                    {showCancel && (
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={onClose}
                        className="flex-1"
                      >
                        {cancelText}
                      </Button>
                    )}
                    <Button
                      fullWidth
                      onClick={handleConfirm}
                      className="flex-1"
                    >
                      {confirmText}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;

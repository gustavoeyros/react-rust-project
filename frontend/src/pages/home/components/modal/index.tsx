import React from "react";
import { ModalOverlay, ModalContent, CloseButton } from "./styled";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseButton onClick={onClose}>
          <IoMdClose />
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

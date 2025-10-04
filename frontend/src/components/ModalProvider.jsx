import { createPortal } from "react-dom";
import { ModalContext } from "./ModalContext";
import { useState } from "react";

export const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(<>Hello</>);

    const closeModal = () => {
        document.body.style.overflow = 'auto'
        console.log('closed')
        setShowModal(false)
        setModalContent(<></>)
    }

    const openModal = (content) => {
        document.body.style.overflow = 'hidden'
        console.log('opened')
        setShowModal(true)
        setModalContent(content)
    }


    
    return (

        <ModalContext.Provider
            value={{
                openModal,
                showModal,
                setShowModal,
                modalContent,
                setModalContent,
                closeModal
            }}
        > 
            {createPortal(modalContent , document.body)}
            {children}
        </ModalContext.Provider>
    );
};


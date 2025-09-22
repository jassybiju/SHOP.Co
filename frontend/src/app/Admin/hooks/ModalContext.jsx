import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => {
    return useContext(ModalContext)
};


export const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(<>Hello</>);

    const closeModal = () => {
        console.log('closed')
        setShowModal(false)
        setModalContent(<></>)
    }
    return (

        <ModalContext.Provider
            value={{
                showModal,
                setShowModal,
                modalContent,
                setModalContent,
                closeModal
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};


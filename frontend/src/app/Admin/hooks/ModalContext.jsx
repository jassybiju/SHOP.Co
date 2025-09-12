import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => {
    return useContext(ModalContext)
};


export const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(<>Hello</>);


    return (

        <ModalContext.Provider
            value={{
                showModal,
                setShowModal,
                modalContent,
                setModalContent,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};


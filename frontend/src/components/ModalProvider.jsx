import { createPortal } from "react-dom";
import { ModalContext } from "./ModalContext";
import { useEffect, useState } from "react";
import { IsRestoringProvider } from "@tanstack/react-query";

export const ModalProvider = ({ children }) => {
    // const [showModal, setShowModal] = useState(false);
    // const [modalContent, setModalContent] = useState(<>Hello</>);
    const [modals, setModals] = useState([])

    useEffect(()=>{
        console.log(modals)
    },[modals])

    const closeModal = (name) => {
        console.log(modals)
        console.log('closed',name)
        setModals(prev=>prev.filter((modal)=> modal.name !== name))

        setTimeout(()=>{
            console.log(modals.length)
          if(modals.length <= 1)  document.body.style.overflow = 'auto'
          console.log(modals)
        },0)
    }

    const openModal = (name , content) => {
        document.body.style.overflow = 'hidden'
        console.log('opened', name, content)
        setModals(prev => [...prev, {name , content}])

        console.log(modals)

    }



    return (

        <ModalContext.Provider
            value={{
                openModal,
                closeModal
            }}
        >
        {modals.map((modal)=>createPortal(modal.content , document.body)
        )}
        {children}
        </ModalContext.Provider>
    );
};


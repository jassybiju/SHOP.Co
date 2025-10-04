import { useContext } from "react";
import { ModalContext } from "../components/ModalContext";

export const useModal = () => {
    return useContext(ModalContext);
};

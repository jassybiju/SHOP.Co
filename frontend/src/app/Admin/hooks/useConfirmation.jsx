import { useCallback, useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

export const useConfirmation = () => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: "",
        message: "",
        confirmText: "Confirm",

        actionToExecute: null,
    });

    const handleConfirm = useCallback(() => {
        if (modalState.actionToExecute) {
            modalState.actionToExecute();
        }
        setModalState((prev) => ({
            ...prev,
            isOpen: false,
            actionToExecute: null,
        }));
    }, [modalState.actionToExecute]);

    const handleClose = useCallback(() => {
        setModalState((prev) => ({
            ...prev,
            isOpen: false,
            actionToExecute: null,
        }));
    }, []);

    const openConfirmation = useCallback((action, options) => {
        console.log('23d')
        setModalState((prev) => ({
            isOpen: true,
            title: options.title || "Confirm Action",
            message: options.message || "Are you sure to proceed",
            actionToExecute: action,
        }));
    }, []);

    return {
        openConfirmation,
        ConfirmationComponent: (
            <ConfirmationModal
                isOpen={modalState.isOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title={modalState.title}
                message={modalState.message}
                confirmText={modalState.confirmText}
                isDanger={modalState.isDanger}
            />
        ),
    };
};

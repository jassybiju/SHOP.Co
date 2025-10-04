import { useModal } from "../../../hooks/useModal";
const useConfirmationModal = () => {
    const { openModal, closeModal } = useModal();

    const onClick = (onConfirm = () =>{}, message = '') =>{
        console.log(onConfirm,22 )
        openModal(
            <>
                <div className="fixed inset-0 bg-black bg-opacity-40 h-screen flex items-center justify-center z-50">
                    {/* Modal Container */}
                    <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Are you sure?
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Do you really want to {message}
                            proceed?
                        </p>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={()=>{onConfirm?.();closeModal()}}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return onClick;
};
export default useConfirmationModal;

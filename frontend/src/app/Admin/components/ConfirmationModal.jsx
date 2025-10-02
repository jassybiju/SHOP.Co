import { useModal } from "../hooks/ModalContext";

const ConfirmationModal = ({ onConfirm ,title ,message , confirmText="Confirm" }) => {
    const {closeModal}= useModal()
    
    const handleConfirm = (e) => {
        e.stopPropagation();
        onConfirm()
        closeModal()
    }
    const handleOverlayClick = (e)=>{
        if(e.target === e.currentTarget){
            closeModal()
        }
    }

    
  return (
   

    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      
      {/* **Modal Container:** White box, shadow, centered content. */}
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 transform transition-all sm:my-8 sm:align-middle"
        // Prevent clicks on the container from triggering the overlay's onClose
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Modal Header/Title */}
        <div className="border-b pb-3 mb-4">
          <h3 id="modal-title" className="text-xl font-semibold text-gray-900">
            {title}
          </h3>
        </div>
        
        {/* Modal Body/Message */}
        <div className="mb-6">
          <p className="text-gray-600">
            {message}
          </p>
        </div>
        
        {/* Modal Footer/Actions */}
        <div className="flex justify-end space-x-3">
          
          {/* Cancel Button (Secondary) */}
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150"
            onClick={closeModal}
          >
            Cancel
          </button>
          
          {/* Confirm Button (Primary/Danger) */}
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
   
  </div>
  )
};
export default ConfirmationModal;

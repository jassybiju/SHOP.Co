const ModalWrapper = ({ render }) => {
    return (
        <div className="fixed inset-0 bg-gray-50/50 bg-opacity-40 h-screen flex items-center justify-center z-50">
            {render}
        </div>
    );
};
export default ModalWrapper;

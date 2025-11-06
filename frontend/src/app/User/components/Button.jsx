const Button = ({ label = "button",className, onClick = () => {},disabled =false, isLoading = false, loadingLabel = '', ...rest }) => {
    console.log(label, disabled)
    return (
        <button
            onClick={onClick}
            {...rest}
            disabled={disabled}

            className={`bg-black text-white hover:bg-gray-900 hover:text-white ring px-10 py-4 rounded disabled:bg-gray-900 ${className}`}
        >
            {isLoading ? loadingLabel : label}
        </button>
    );
};
export default Button;

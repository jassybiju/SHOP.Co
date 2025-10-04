const ToggleBtn = ({ state , onClick = () => {} }) => {
    return (
        <label class="inline-flex items-center mb-5 cursor-pointer">
            <input 
                onClick={onClick}
                type="checkbox"
                value=""
                class="sr-only peer"
                checked={state}
            />
            <div class="relative w-11 h-6 bg-red-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-red-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
        </label>
    );
};
export default ToggleBtn;

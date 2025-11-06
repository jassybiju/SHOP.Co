const Dropdown = ({ label = "Lable", options = [], value, onChange }) => {
    return (
        <div className="w-[50%] h-full ">
            <select
                onChange={onChange}
                value={value}
                placeholder={'hi'}
                className="bg-gray-50 border h-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
            >
                <option selected disabled value={''}>{label}</option>
               
                {options.map((opt, idx) => (
                    <option key={idx} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

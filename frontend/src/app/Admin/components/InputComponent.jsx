const InputComponent = ({
    register,
    error,
    label,
    width = 100,
    select = false,
    options = [],
    id,
    colorPicker = false,
    textarea = false,
    readonly,
    defaultValue,
    required=false,
    ...rest
}) => {
    console.log(defaultValue)
    let input;
    if (colorPicker) {
        input = (
            <input type="color" defaultValue={"#fff"} {...register} disabled={readonly} {...rest} />
        );
    } else if (select) {
        input = (
            <select
                id={id}
                {...register}
                {...rest}
                defaultValue={defaultValue}
                disabled ={readonly}
                className={`block w-full bg-gray-50 border ${
                    error ? "border-red-400" : "border-gray-300"
                } rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
            >
                <option value="">{label}</option>
                {options.map((opt) => (
                    <option key={opt.value || opt} value={opt.value || opt}>
                        {opt.label || opt}
                    </option>
                ))}
            </select>
        );
    } else if (textarea) {
        input = (
            <textarea
                {...rest}
                {...register}
                disabled={readonly}
                className={`block w-full bg-gray-50 border ${
                    error ? "border-red-400" : "border-gray-300"
                } rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
                placeholder={`Enter ${label}`}
            />
        );
    } else {
        input = (
            <input
                id={id}
                {...register}
                {...rest}
                disabled={readonly}
                placeholder={`Enter ${label}`}
                className={`block w-full bg-gray-50 border ${
                    error ? "border-red-400" : "border-gray-300"
                } rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
            />
        );
    }

    return (
        <div
            className={`mb-7 w-full max-w-full`}
            style={{ width: `${width}%` }}
        >
            <label
                htmlFor={id}
                className="block text-gray-700 font-medium mb-2"
            >
              {required && '* '}  {label}
            </label>
            <div className="relative">
                {input}
                {/* {select ? (
                    <select
                        id={id}
                        {...register}
                        {...rest}
                        className={`block w-full bg-gray-50 border ${
                            error ? "border-red-400" : "border-gray-300"
                        } rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
                    >
                        <option value="">{label}</option>
                        {options.map((opt) => (
                            <option
                                key={opt.value || opt}
                                value={opt.value || opt}
                            >
                                {opt.label || opt}
                            </option>
                        ))}
                    </select>
                ) :{ true ? 
                    (
                        <input type="text" />
                    )
                    : (    <input
                        id={id}
                        {...register}
                        {...rest}
                        placeholder={`Enter ${label}`}
                        className={`block w-full bg-gray-50 border ${
                            error ? "border-red-400" : "border-gray-300"
                        } rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
                    />)
                }
            }
     */}
                {error && (
                    <p className="text-red-500 text-xs mt-2 absolute left-0">
                        {error.message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default InputComponent;

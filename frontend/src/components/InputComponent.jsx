import React from 'react'

const InputComponent = ({
  register,
  errors,
  label,
  width = 100,
  select = false,
  options = [],
  id,
  colorPicker = false,
  textarea = false,
  readonly,
  defaultValue,
  placeholder,
  required = false,
  ref: customRef,
  ...rest
}) => {
  const registerProps = register || {};
  const { ref: registerRef, ...registerRest } = registerProps;
  console.log  (errors)
  // Combine both refs (from register + custom)
  const handleRef = (el) => {
    if (registerRef) registerRef(el);
    if (customRef) {
      if (typeof customRef === "function") customRef(el);
      else customRef.current = el;
    }
  };

  let input;
  if (colorPicker) {
    input = (
      <input
        type="color"
        defaultValue={defaultValue || "#ffffff"}
        ref={handleRef}
        disabled={readonly}
        {...registerRest}
        {...rest}
      />
    );
  }
   else if (select) {
    input = (
      <select
        id={id}
        ref={handleRef}
        defaultValue={defaultValue}
        disabled={readonly}
        {...registerRest}
        {...rest}
        className={`block w-full bg-gray-50 border ${
          errors ? "border-red-400" : "border-gray-300"
        } rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
      >
        <option value="">{placeholder ? placeholder : label}</option>
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
        ref={handleRef}
        disabled={readonly}
        placeholder={placeholder ? placeholder : `Enter ${label}`}
        {...registerRest}
        {...rest}
        className={`block w-full bg-gray-50 border ${
          errors ? "border-red-400" : "border-gray-300"
        } rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
      />
    );
  } else {
    input = (
      <input
        id={id}
        ref={handleRef}
        disabled={readonly}
        defaultValue={defaultValue}
        placeholder={placeholder ? placeholder : `Enter ${label}`}
        {...registerRest}
        {...rest}
        className={`block w-full bg-gray-50 border ${
          errors ? "border-red-400" : "border-gray-300"
        } rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
      />
    );
  }

  return (
    <div className={`mb-7 w-full max-w-full`} style={{ width: `${width}%` }}>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {required && "* "} {label}
      </label>
      <div className="relative">
        {input}
        {errors && (
          <p className="text-red-500 text-xs mt-2 absolute left-0">
            {errors.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputComponent;


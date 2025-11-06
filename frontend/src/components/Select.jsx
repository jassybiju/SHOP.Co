const Select = ({ label, options = [], register, error , required }) => {
  const baseClass =
    "w-[100%] p-3 text-sm text-gray-900 bg-white/80 backdrop-blur-sm border-b-2 outline-none transition-all duration-200";
  
  const focusClass = "focus:border-blue-500 focus:ring-0";
  
  const errorClass = error
    ? "border-red-500 placeholder-red-400 text-red-500"
    : "border-gray-300";

  return (
    <div className="mb-4 w-[100%]">
      <select
        aria-invalid={!!error}
        {...register}
        className={`${baseClass} ${focusClass} ${errorClass}`}
      >
        <option value="" className={` ${errorClass} text-red-500 ${error && 'text-red-400'}`}>{label} {required && '*'}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">
          {error || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default Select;

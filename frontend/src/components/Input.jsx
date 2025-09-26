import {ChevronRight, Eye, EyeClosed, EyeOff } from 'lucide-react'
import { useState } from 'react';

const Input = ({ label, type = "text", register, error }) => {
  const [passwordView, setPasswordView] = useState(false)
  const baseClass =
    "w-[100%] p-3 text-sm text-gray-900 bg-white/80 backdrop-blur-sm border-b-2 outline-none transition-all duration-200";
  
  const focusClass =
    "focus:border-blue-500 focus:ring-0";
  
  const errorClass =
    error ? "border-red-500 placeholder-red-400" : "border-gray-300";
  
  return (
    <div className="mb-4 w-[100%]">
      <div className='flex relative items-center'>
      <input 
        
        type={type === 'password' ? (passwordView  ? 'text' : 'password') : 'text'}
        placeholder={label}
        aria-invalid={!!error}
        {...register}
        className={`${baseClass} ${focusClass} ${errorClass}`}
      />
      <span className='absolute right-0' onClick={()=>setPasswordView(state => !state)}>{type === 'password' && (passwordView ? <Eye/> : <EyeOff/>) }</span>
       </div>
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">
          {error || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default Input;

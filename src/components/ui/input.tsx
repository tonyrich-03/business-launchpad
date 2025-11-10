import React from 'react';
import type { InputHTMLAttributes } from 'react';

// Omit the native 'size' property since we're redefining it
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  error?: string;
  success?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg'; // Our custom size prop
  variant?: 'default' | 'filled' | 'outlined';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  type = 'text', 
  error,
  success,
  helperText,
  fullWidth = true,
  size = 'md',
  variant = 'default',
  startIcon,
  endIcon,
  className = '',
  disabled,
  ...props 
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-4 py-4 text-lg'
  };

  const labelSizeClasses = {
    sm: 'text-sm mb-1',
    md: 'text-base mb-2',
    lg: 'text-lg mb-2'
  };

  // Variant classes
  const variantClasses = {
    default: `
      bg-white border border-gray-300 
      focus:border-blue-500 focus:ring-2 focus:ring-blue-200
      ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
      ${success ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : ''}
    `,
    filled: `
      bg-gray-50 border border-gray-200
      focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200
      ${error ? 'border-red-200 bg-red-50 focus:border-red-500 focus:ring-red-200' : ''}
      ${success ? 'border-green-200 bg-green-50 focus:border-green-500 focus:ring-green-200' : ''}
    `,
    outlined: `
      bg-transparent border-2 border-gray-200
      focus:border-blue-500 focus:ring-1 focus:ring-blue-200
      ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
      ${success ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : ''}
    `
  };

  // Base input classes
  const baseClasses = `
    rounded-lg transition-all duration-200
    placeholder-gray-400
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:bg-gray-100 disabled:border-gray-200
    outline-none
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
  `;

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={props.id}
          className={`
            block font-medium transition-colors duration-200
            ${labelSizeClasses[size]}
            ${error ? 'text-red-700' : success ? 'text-green-700' : 'text-gray-700'}
            ${disabled ? 'text-gray-500' : ''}
          `}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Start Icon */}
        {startIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {startIcon}
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          className={`
            ${baseClasses}
            ${startIcon ? 'pl-10' : ''}
            ${endIcon ? 'pr-10' : ''}
            ${error ? 'text-red-900' : success ? 'text-green-900' : 'text-gray-900'}
          `}
          disabled={disabled}
          {...props}
        />

        {/* End Icon */}
        {endIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {endIcon}
          </div>
        )}

        {/* Success Icon */}
        {success && !endIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Error Icon */}
        {error && !endIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* Helper Text & Error Message */}
      {(helperText || error) && (
        <p 
          className={`
            mt-2 text-sm transition-colors duration-200
            ${error ? 'text-red-600' : success ? 'text-green-600' : 'text-gray-500'}
            ${disabled ? 'text-gray-400' : ''}
          `}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
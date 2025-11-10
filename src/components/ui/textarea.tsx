import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  rows?: number;
  error?: string;
  success?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  characterCount?: {
    max: number;
    current: number;
  };
}

const Textarea = ({ 
  label, 
  rows = 4, 
  error,
  success,
  helperText,
  fullWidth = true,
  size = 'md',
  variant = 'default',
  resize = 'vertical',
  characterCount,
  className = '',
  disabled,
  ...props 
}: TextareaProps) => {
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

  // Resize classes
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  };

  // Base textarea classes
  const baseClasses = `
    rounded-lg transition-all duration-200
    placeholder-gray-400
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:bg-gray-100 disabled:border-gray-200
    outline-none
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${resizeClasses[resize]}
    ${fullWidth ? 'w-full' : ''}
  `;

  const isNearLimit = characterCount && characterCount.current > characterCount.max * 0.8;
  const isOverLimit = characterCount && characterCount.current > characterCount.max;

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${className}`}>
      {/* Label and Character Count */}
      <div className="flex justify-between items-end mb-2">
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
        
        {/* Character Count */}
        {characterCount && (
          <div className={`
            text-xs transition-colors duration-200
            ${isOverLimit 
              ? 'text-red-600 font-medium' 
              : isNearLimit 
              ? 'text-yellow-600' 
              : 'text-gray-500'
            }
            ${disabled ? 'text-gray-400' : ''}
          `}>
            {characterCount.current}/{characterCount.max}
          </div>
        )}
      </div>

      {/* Textarea Field */}
      <textarea
        rows={rows}
        className={`
          ${baseClasses}
          ${error ? 'text-red-900' : success ? 'text-green-900' : 'text-gray-900'}
          ${isOverLimit ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
        `}
        disabled={disabled}
        {...props}
      />

      {/* Helper Text & Error Message */}
      {(helperText || error) && (
        <div className="flex items-start gap-2 mt-2">
          {(error || (isOverLimit && characterCount)) && (
            <svg 
              className={`flex-shrink-0 mt-0.5 ${error || isOverLimit ? 'text-red-500' : 'text-green-500'}`}
              width="16" 
              height="16" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {error || isOverLimit ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              )}
            </svg>
          )}
          <p 
            className={`
              text-sm transition-colors duration-200 flex-1
              ${error || isOverLimit ? 'text-red-600' : success ? 'text-green-600' : 'text-gray-500'}
              ${disabled ? 'text-gray-400' : ''}
            `}
          >
            {error || (isOverLimit && `Character limit exceeded by ${characterCount.current - characterCount.max}`) || helperText}
          </p>
        </div>
      )}
    </div>
  );
};

export default Textarea;
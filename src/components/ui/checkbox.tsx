import type { FC, ChangeEvent } from 'react';

type CheckboxProps = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export const Checkbox: FC<CheckboxProps> = ({ 
  checked, 
  onChange, 
  label, 
  className = '',
  disabled = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <label className={`
      inline-flex items-center gap-3 cursor-pointer group
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${className}
    `}>
      {/* Custom Checkbox Container */}
      <div className="relative">
        {/* Hidden Native Checkbox */}
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="absolute opacity-0 w-0 h-0"
        />
        
        {/* Custom Checkbox Design */}
        <div className={`
          relative flex items-center justify-center
          border-2 rounded transition-all duration-200
          ${sizeClasses[size]}
          ${checked 
            ? 'bg-blue-500 border-blue-500 shadow-sm' 
            : 'bg-white border-gray-300 group-hover:border-blue-400'
          }
          ${disabled 
            ? 'bg-gray-100 border-gray-300' 
            : 'group-hover:shadow-md group-active:scale-95'
          }
        `}>
          {/* Checkmark */}
          {checked && (
            <svg 
              className={`text-white transition-all duration-200 ${size === 'sm' ? 'w-2.5 h-2.5' : size === 'md' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          )}
        </div>

        {/* Focus Ring */}
        <div className={`
          absolute -inset-2 rounded-lg transition-all duration-200
          ${checked ? 'bg-blue-100' : 'group-hover:bg-gray-100'}
          opacity-0 group-focus-within:opacity-100
          -z-10
        `} />
      </div>

      {/* Label */}
      <span className={`
        font-medium transition-colors duration-200
        ${labelSizeClasses[size]}
        ${checked && !disabled ? 'text-gray-900' : 'text-gray-700'}
        ${disabled ? 'text-gray-500' : 'group-hover:text-gray-900'}
      `}>
        {label}
      </span>
    </label>
  );
};
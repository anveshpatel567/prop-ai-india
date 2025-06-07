
import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-rajdhani font-medium text-gray-700">
        {label}
        {required && <span className="text-fire-secondary ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl 
          glow-focus transition-all duration-200 font-inter text-gray-700
          placeholder:text-gray-400 ${
            error ? 'border-red-400 focus:ring-red-500/50' : ''
          } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
      />
      {error && (
        <p className="text-sm text-fire-secondary font-inter">{error}</p>
      )}
    </div>
  );
};

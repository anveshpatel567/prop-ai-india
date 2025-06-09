
import React from 'react';

interface FormSectionDividerProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const FormSectionDivider: React.FC<FormSectionDividerProps> = ({
  title,
  description,
  icon,
  className = ''
}) => {
  return (
    <div className={`py-4 ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {description && (
        <p className="text-sm text-gray-600 ml-11">{description}</p>
      )}
      <div className="mt-3 border-t border-orange-100"></div>
    </div>
  );
};

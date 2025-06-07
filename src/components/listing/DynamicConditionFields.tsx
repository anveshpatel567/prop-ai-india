
import React from 'react';
import { ListingCondition } from '../../types';
import { getSafeSelectValue, getSafeSelectLabel, getSafeOptions } from '../../utils/selectUtils';

interface DynamicConditionFieldsProps {
  conditions: ListingCondition[];
  values: Record<string, any>;
  onChange: (conditionId: string, value: any) => void;
  className?: string;
}

export const DynamicConditionFields: React.FC<DynamicConditionFieldsProps> = ({
  conditions,
  values,
  onChange,
  className = ''
}) => {
  const renderField = (condition: ListingCondition) => {
    const value = values[condition.id] || '';
    
    switch (condition.input_type) {
      case 'dropdown':
        const safeOptions = getSafeOptions(condition.options);
        
        return (
          <select
            value={getSafeSelectValue(value)}
            onChange={(e) => onChange(condition.id, e.target.value === '-' ? '' : e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl 
              glow-focus transition-all duration-200 font-inter"
          >
            <option value="-">Select {condition.label}</option>
            {safeOptions.map((option, index) => {
              const optionValue = typeof option === 'string' ? option : option?.value || '';
              const optionLabel = typeof option === 'string' ? option : option?.label || optionValue;
              
              // Skip if value is empty
              if (!optionValue || optionValue.trim() === '') {
                console.warn('Skipping empty option for condition:', condition.label, option);
                return null;
              }
              
              return (
                <option key={`${condition.id}-${index}-${optionValue}`} value={optionValue}>
                  {getSafeSelectLabel(optionLabel)}
                </option>
              );
            })}
          </select>
        );
        
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value === true}
              onChange={(e) => onChange(condition.id, e.target.checked)}
              className="w-4 h-4 text-fire-primary border-gray-300 rounded focus:ring-orange-500/50"
            />
            <span className="font-inter text-sm text-gray-700">{condition.label}</span>
          </div>
        );
        
      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(condition.id, e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl 
              glow-focus transition-all duration-200 font-inter"
          />
        );
        
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(condition.id, e.target.value)}
            placeholder={`Enter ${condition.label.toLowerCase()}`}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl 
              glow-focus transition-all duration-200 font-inter"
          />
        );
        
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(condition.id, e.target.value)}
            placeholder={`Enter ${condition.label.toLowerCase()}`}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl 
              glow-focus transition-all duration-200 font-inter"
          />
        );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {conditions.map((condition) => (
        <div key={condition.id} className="space-y-2">
          {condition.input_type !== 'checkbox' && (
            <label className="block text-sm font-rajdhani font-medium text-gray-700">
              {condition.label}
              {condition.is_required && <span className="text-fire-secondary ml-1">*</span>}
            </label>
          )}
          {renderField(condition)}
        </div>
      ))}
    </div>
  );
};

import React from 'react';
import ReactSelect, { Props as SelectProps, StylesConfig } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps extends Omit<SelectProps<Option>, 'styles'> {
  className?: string;
}

const customStyles: StylesConfig<Option> = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '48px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(4px)',
    boxShadow: 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#8b5cf6' : '#d1d5db',
    },
    borderColor: state.isFocused ? '#8b5cf6' : '#e5e7eb',
    transition: 'all 0.3s ease',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#8b5cf6' 
      : state.isFocused 
      ? '#f3f4f6' 
      : 'white',
    color: state.isSelected ? 'white' : '#374151',
    padding: '12px 16px',
    '&:hover': {
      backgroundColor: state.isSelected ? '#8b5cf6' : '#f3f4f6',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#374151',
  }),
};

export const Select: React.FC<CustomSelectProps> = ({ className, ...props }) => {
  return (
    <ReactSelect
      styles={customStyles}
      className={className}
      classNamePrefix="react-select"
      {...props}
    />
  );
};

export default Select;
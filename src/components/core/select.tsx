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
    minHeight: '32px',
    height: '32px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: 'none',
    fontSize: '14px',
    '&:hover': {
      borderColor: state.isFocused ? '#0ea5e9' : '#9ca3af',
    },
    borderColor: state.isFocused ? '#0ea5e9' : '#d1d5db',
    transition: 'all 0.2s ease',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    fontSize: '14px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#0ea5e9' 
      : state.isFocused 
      ? '#f1f5f9' 
      : 'white',
    color: state.isSelected ? 'white' : '#374151',
    padding: '8px 12px',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: state.isSelected ? '#0ea5e9' : '#f1f5f9',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: '14px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#374151',
    fontSize: '14px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 8px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '4px',
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
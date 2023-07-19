'use client';
import { useId } from 'react';
import SelectCore, { GroupBase, OnChangeValue, Props } from 'react-select';

interface CustomSelectProps {
  label?: string;
  setFieldValue: (name: string, value: any) => void;
  error?: string;
}

function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  label,
  name,
  error,
  setFieldValue,
  className,
  ...props
}: Props<Option, IsMulti, Group> & CustomSelectProps) {
  const selectId = useId();
  const handleChange = (newValue: OnChangeValue<Option, IsMulti>) => {
    setFieldValue(name as string, newValue);
  };
  return (
    <div className={`custom_select ${className} ${error ? 'error' : ''}`}>
      <label className="text-lg text-emerald-800">{label}</label>
      <SelectCore
        id={selectId}
        name={name}
        {...props}
        classNamePrefix="selectCustom"
        onChange={handleChange}
      />
      <span className="text-sm text-red-600">{error}</span>
    </div>
  );
}

export default Select;

import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState, useCallback } from 'react';

import { SelectFieldBase } from './SelectField';

export default {
  title: 'Generic/Form Elements/SelectField',
  component: SelectFieldBase,
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    options: { control: 'object' },
    isSearchable: { control: 'boolean' },
  },
  args: {
    label: 'hello',
    error: '',
    placeholder: 'coucou',
  },
} as Meta;

const options = [
  { value: '1', label: 'Hello1' },
  { value: '2', label: 'Hello2' },
  { value: '3', label: 'Hello3' },
  { value: '4', label: 'Hello4' },
  { value: '5', label: 'Hello5' },
];

export const Example: Story = (args) => {
  const [value, setValue] = useState<string | string[]>(args.multiple ? [] : '');
  const onChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      action('newValue')(newValue);
      setValue(newValue);
    },
    [setValue],
  );
  return <SelectFieldBase onChange={onChange} value={value} options={options} {...args} />;
};

Example.args = {
  multiple: false,
};

const optionGroups = [
  {
    label: 'group1',
    options: [
      { value: '1', label: 'Hello1' },
      { value: '2', label: 'Hello2' },
      { value: '3', label: 'Hello3' },
    ],
  }, {
    label: 'group2',
    options: [
      { value: '4', label: 'Hello4' },
      { value: '5', label: 'Hello5' }],
  },
];

export const GroupExample: Story = (args) => {
  const [value, setValue] = useState('value');
  const onChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      action('newValue')(newValue);
      setValue(newValue);
    },
    [setValue],
  );
  return <SelectFieldBase onChange={onChange} value={value} optionGroups={optionGroups} {...args} />;
};

export const GroupMultipleExample: Story = (args) => {
  const [value, setValue] = useState([]);
  const onChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      action('newValue')(newValue);
      setValue(newValue);
    },
    [setValue],
  );
  return <SelectFieldBase multiple onChange={onChange} value={value} optionGroups={optionGroups} {...args} />;
};

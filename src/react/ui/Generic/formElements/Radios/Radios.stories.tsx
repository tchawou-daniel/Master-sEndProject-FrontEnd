import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState, useCallback } from 'react';

import { RadiosBase } from './Radios';

export default {
  title: 'Generic/Form Elements/Radios',
  component: RadiosBase,
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object' },
    color: {
      control: {
        type: 'select',
        options: [
          null,
          'primary',
          'secondary',
        ],
      },
    },
  },
  args: {
    label: 'Those are radios!',
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
  const [value, setValue] = useState<string>('1');
  const onChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      action('newValue')(newValue);
      setValue(newValue);
    },
    [setValue],
  );
  return (
    <RadiosBase
      onChange={onChange}
      value={value}
      options={options}
      label={args.label}
      color={args.color}
    />
  );
};

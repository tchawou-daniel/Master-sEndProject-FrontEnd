import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState, useCallback } from 'react';

import { TextFieldBase } from './TextField';

export default {
  title: 'Generic/Form Elements/Inputs/TextField',
  component: TextFieldBase,
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
  },
} as Meta;

export const Example: Story = (args) => {
  const [value, setValue] = useState('value');
  const onChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      action('newValue')(newValue);
      setValue(newValue);
    },
    [setValue],
  );
  return <TextFieldBase onChange={onChange} value={value} {...args} />;
};

Example.args = {
  label: 'hello',
  error: '',
};

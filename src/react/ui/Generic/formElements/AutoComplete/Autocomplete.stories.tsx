import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { ReactNode, useCallback, useState } from 'react';

import { AutocompleteField } from './Autocomplete';

export default {
  title: 'Generic/Form Elements/AutoComplete',
  component: Autocomplete,
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object' },
  },
  args: {
    label: 'hello',
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
  const [value, setValue] = useState<{ value: string, label: string }>();
  const onChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      action('newValue')(newValue);
      setValue(newValue);
    },
    [setValue],
  );

  const renderInput = useCallback((params): ReactNode => (
    <TextField
      {...params}
      variant="outlined"
    />
  ), []);

  return (
    <AutocompleteField
      options={options}
      value={value}
      onChange={onChange}
      renderInput={renderInput}
      {...args}
    />
  );
};

Example.args = {
  multiple: false,
};

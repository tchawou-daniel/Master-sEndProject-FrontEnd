import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { DatePickerInlineBase } from './KeyboardDatePicker';

export default {
  title: 'Generic/Form Elements/Dates/KeyboardDatePicker',
  component: DatePickerInlineBase,
  args: {
    date: new Date(),
  },
} as Meta;

export const Example: Story = () => (
  <DatePickerInlineBase
    onChange={action('onChange')}
    value={new Date()}
  />
);

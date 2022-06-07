import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import Checkbox from './Checkbox';

export default {
  title: 'Generic/Form Elements/Checkbox',
  component: Checkbox,
  args: {
    checked: true,
  },
} as Meta;

export const Example: Story = args => (
  <>
    {
      ['primary' as 'primary', 'secondary' as 'secondary', 'tertiary' as 'tertiary'].map(color => (
        <Checkbox color={color} key={color} checked={args.checked} />
      ))
    }
  </>
);

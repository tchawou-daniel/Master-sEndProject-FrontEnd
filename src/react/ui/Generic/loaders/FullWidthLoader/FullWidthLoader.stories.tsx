import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import FullWidthLoader from './FullWidthLoader';

export default {
  title: 'Generic/Loaders/FullWidthLoader',
  component: FullWidthLoader,
  args: {
    show: true,
  },
} as Meta;

export const Example: Story = args => <FullWidthLoader show={args.show} />;

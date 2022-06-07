/* eslint-disable max-len */
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Spinner, SpinnerBoundary } from './Spinner';

export default {
  title: 'Generic/Loaders/Spinner',
  component: Spinner,
  args: {
    show: false,
    background: false,
  },
} as Meta;

export const Example: Story = args => (
  <SpinnerBoundary>
    {args.show && <Spinner background={args.background} />}
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda at consequatur culpa cupiditate delectus deserunt eligendi est, illum ipsa ipsum laboriosam officia omnis quae recusandae repellendus veniam vero?</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda at consequatur culpa cupiditate delectus deserunt eligendi est, illum ipsa ipsum laboriosam officia omnis quae recusandae repellendus veniam vero?</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda at consequatur culpa cupiditate delectus deserunt eligendi est, illum ipsa ipsum laboriosam officia omnis quae recusandae repellendus veniam vero?</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda at consequatur culpa cupiditate delectus deserunt eligendi est, illum ipsa ipsum laboriosam officia omnis quae recusandae repellendus veniam vero?</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda at consequatur culpa cupiditate delectus deserunt eligendi est, illum ipsa ipsum laboriosam officia omnis quae recusandae repellendus veniam vero?</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda at consequatur culpa cupiditate delectus deserunt eligendi est, illum ipsa ipsum laboriosam officia omnis quae recusandae repellendus veniam vero?</p>
  </SpinnerBoundary>
);

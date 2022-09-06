import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import Table from './Table';

export default {
  title: 'Generic/Tables/Table',
  component: Table,
} as Meta;

export const Example: Story = args => (
  <Table {...args}>
    <thead><tr><th>A</th><th>B</th><th>C</th></tr></thead>
    <tbody>
      <tr><td>A</td><td>B</td><td>C</td></tr>
      <tr><td>A</td><td>B</td><td>C</td></tr>
      <tr><td>A</td><td>B</td><td>C</td></tr>
    </tbody>
  </Table>
);

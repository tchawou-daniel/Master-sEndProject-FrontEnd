import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useCallback, useState } from 'react';

import Pagination from './Pagination';

export default {
  title: 'Generic/Layout/Pagination',
  component: Pagination,
  args: {
    total: 10,
  },
} as Meta;

export const Example: Story = (args) => {
  const [current, setCurrent] = useState<number>(1);
  const onPageChange = useCallback((page) => {
    action('Change page')(page);
    setCurrent(page);
  }, [setCurrent]);

  return (
    <Pagination
      total={args.total}
      current={current}
      onPageChange={onPageChange}
    />
  );
};

import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useCallback, useState } from 'react';

import QuickEdit from './QuickEdit';

export default {
  title: 'Generic/Form Elements/Inputs/QuickEdit',
  component: QuickEdit,
} as Meta;

export const Example: Story = () => {
  const [value, setValue] = useState<string>('HELLO');
  const onChange = useCallback((v) => { setValue(v); }, [setValue]);
  return <QuickEdit currentValue={value} onSubmit={onChange} />;
};

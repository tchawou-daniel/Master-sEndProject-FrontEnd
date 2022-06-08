import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useCallback, useState } from 'react';

import { DateRange } from 'types/__common';

import DateRangeModal from './DateRangeModal';

export default {
  title: 'Generic/Form Elements/Dates/DateRangeModal',
  component: DateRangeModal,
} as Meta;

export const Example: Story = (args) => {
  const [value, setValue] = useState<DateRange>({ startDate: null, endDate: null });

  const onChangeProxy = useCallback((newValue) => {
    action('onChange')(newValue);
    setValue(newValue);
  }, [setValue]);

  return (
    <DateRangeModal
      value={value}
      onChange={onChangeProxy}
      {...args}
    />
  );
};

import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import DatePicker, { DatePickerLinkInput } from './DatePicker';

export default {
  title: 'Generic/Form Elements/Dates/DatePicker',
  component: DatePicker,
  argTypes: {
    pickerType: {
      control: {
        type: 'select',
        options: {
          Day: {},
          Month: { dateFormat: 'MM/yyyy', showMonthYearPicker: true },
          Quarter: { dateFormat: 'yyyy, QQQ', showQuarterYearPicker: true },
          Year: { dateFormat: 'yyyy', showYearPicker: true },
        },
      },
    },
  },
} as Meta;

export const Example: Story = (args) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      open
      selected={startDate}
      onChange={(date:any) => setStartDate(date)}
      {...args.pickerType}
    />
  );
};

export const ReplaceInputWithLink: Story = (args) => {
  const [startDate, setStartDate] = useState(new Date());
  const ref = React.createRef();

  return (
    <DatePicker
      selected={startDate}
      onChange={(date:any) => setStartDate(date)}
      customInput={<DatePickerLinkInput ref={ref} />}
      {...args.pickerType}
    />
  );
};

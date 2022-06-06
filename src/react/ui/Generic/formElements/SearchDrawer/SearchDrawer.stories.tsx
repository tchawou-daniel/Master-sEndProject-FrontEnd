import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useMemo, useState } from 'react';

import { generateFakeList } from 'services/utils/testUtils';

import { SearchDrawer, SearchDrawerListElement } from './SearchDrawer';

export default {
  title: 'Generic/Form Elements/SearchDrawer',
  component: SearchDrawer,
  args: {
    isLoading: false,
  },
} as Meta;

const data = generateFakeList({ name: 'Name' }, 10);

export const Example: Story = (args) => {
  // You have to control the filter outside of the component.
  const [filter, setFilter] = useState<string>('');
  // So you can implement your own logic for it.
  const filteredData = useMemo(() => data.filter(d => d.name.includes(filter)), [filter]);

  return (
    <SearchDrawer
      isLoading={args.isLoading}
      filter={filter}
      onChangeFilter={setFilter}
    >
      {filteredData.map(d => <SearchDrawerListElement>{d.name}</SearchDrawerListElement>)}
    </SearchDrawer>
  );
};

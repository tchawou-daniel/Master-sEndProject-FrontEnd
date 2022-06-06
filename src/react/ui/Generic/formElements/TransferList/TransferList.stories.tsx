import Grid from '@material-ui/core/Grid';
import { Meta } from '@storybook/react/types-6-0';
import React, { FC } from 'react';

import TransferList, { TransferListItem } from './TransferList';

export default {
  title: 'Generic/Form Elements/TransferList',
  component: TransferList,
} as Meta;

const leftItems: TransferListItem[] = [
  {
    label: 'Item 1',
    id: '1',
  },
];

const rightItems: TransferListItem[] = [
  {
    label: 'Item 2',
    id: '2',
  },
  {
    label: 'Item 3',
    id: '3',
  },
];

export const Example: FC = () => (
  <Grid container>
    <TransferList leftItems={leftItems} rightItems={rightItems} />
  </Grid>
);

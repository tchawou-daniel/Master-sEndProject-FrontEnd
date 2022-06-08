import Grid from '@material-ui/core/Grid';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Switch } from './Switch';
import { SwitchFieldBase } from './SwitchField';

export default {
  title: 'Generic/Form Elements/Switch',
  component: Switch,
  args: {
    height: 32,
  },
} as Meta;

export const Example: Story = args => (
  <Grid container>
    <Switch height={args.height} />
  </Grid>
);

export const InFormik: Story = () => (
  <Grid container>
    <SwitchFieldBase
      labelLeft="Day"
      label="Night"
    />
  </Grid>
);

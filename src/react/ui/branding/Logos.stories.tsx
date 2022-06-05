import { Box } from '@material-ui/core';
import { Meta } from '@storybook/react/types-6-0';
import React, { FC } from 'react';

import { NavbarBrandColoured, NavbarBrandLight } from 'react/ui/branding/logo';

export default {
  title: 'Branding/Logos',
} as Meta;

export const Example: FC = () => (
  <>
    <Box display="flex">
      <NavbarBrandLight />
    </Box>

    <Box display="flex">
      <NavbarBrandColoured />
    </Box>
  </>
);

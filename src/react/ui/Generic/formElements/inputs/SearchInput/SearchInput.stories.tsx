import { Container, Paper, Box } from '@material-ui/core';
import { Meta } from '@storybook/react/types-6-0';
import React, {
  useState, FC,
} from 'react';

import SearchInput from './SearchInput';

export default {
  title: 'Generic/Form Elements/Inputs/SearchInput',
  component: SearchInput,
} as Meta;

export const Story: FC = () => {
  const [value, setValue] = useState<string>('Value');

  return (
    <Container>
      <Paper>
        <Box p={3} width="50%">
          <SearchInput
            value={value}
            onChange={setValue}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export const AlwaysVisibleStory: FC = () => {
  const [value, setValue] = useState<string>('Value');

  return (
    <Container>
      <Paper>
        <Box p={3} width="50%">
          <SearchInput
            value={value}
            onChange={setValue}
            forceSearchVisible
            showBorder
          />
        </Box>
      </Paper>
    </Container>
  );
};

import { Container, Paper, Box } from '@material-ui/core';
import { Meta } from '@storybook/react/types-6-0';
import { lowerCase } from 'lodash';
import React, {
  useState, useCallback, ChangeEvent, FC,
} from 'react';

import InputWithCompilation from './InputWithCompilation';

export default {
  title: 'Generic/Form Elements/Inputs/InputWithCompilation',
  component: InputWithCompilation,
} as Meta;

export const Story: FC = () => {
  const [value, setValue] = useState<string>('Value');
  const [compiledValue, setCompiledValue] = useState<string>('value');

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setCompiledValue(lowerCase(e.target.value));
  }, []);

  return (
    <Container>
      <Paper>
        <Box p={3}>
          <InputWithCompilation
            label="Input with compilation (lower)"
            value={value}
            onChange={onInputChange}
            compiledValue={compiledValue}
            showCompiledValueOnUnfocus
          />
        </Box>
      </Paper>
    </Container>
  );
};

import { TextField } from '@material-ui/core';
import React from 'react';
import {
  render, act, fireEvent, screen,
} from 'TestUtils';

import { AutocompleteField } from './Autocomplete';

const defaultProps = {
  options: [
    { value: 'jean1', label: 'Jean 1' },
    { value: 'jean2', label: 'Jean 2' },
    { value: 'romain', label: 'Romain' },
    { value: 'marc', label: 'Marc' },
  ],
  label: 'AUTOCOMPLETE_LABEL',
};

const INPUT_TEST_ID = 'RENDERED_INPUT_ID';

it('<Autocomplete />', () => {
  const changeHandler = jest.fn();
  const renderInputHandler = jest.fn(params => (
    <TextField
      {...params}
      data-testid={INPUT_TEST_ID}
    />
  ));

  const props = {
    ...defaultProps,
    onChange: changeHandler,
    renderInput: renderInputHandler,
    value: defaultProps.options[3],
  };

  render(
    <AutocompleteField
      {...props}
    />,
  );

  // Expect the render input fn to have been called
  expect(renderInputHandler).toHaveBeenCalled();

  // Expect the custom input to be here
  expect(screen.getByTestId(INPUT_TEST_ID)).toBeInTheDocument();

  // Check that value is printed
  expect(screen.getByRole('textbox')).toHaveValue(props.value.label);

  expect(screen.queryByText(props.options[0].label)).not.toBeInTheDocument();
  expect(screen.queryByText(props.options[1].label)).not.toBeInTheDocument();
  expect(screen.queryByText(props.options[2].label)).not.toBeInTheDocument();

  // Open all options
  act(() => {
    fireEvent.click(screen.getByLabelText('Open'));
  });

  // Verify all options
  expect(screen.getByText(props.options[0].label)).toBeInTheDocument();
  expect(screen.getByText(props.options[1].label)).toBeInTheDocument();
  expect(screen.getByText(props.options[2].label)).toBeInTheDocument();
  expect(screen.getByText(props.options[3].label)).toBeInTheDocument();

  // Click one one
  expect(changeHandler).toHaveBeenCalledTimes(0);

  act(() => {
    fireEvent.click(screen.getByText(props.options[2].label));
  });

  expect(changeHandler).toHaveBeenCalledTimes(1);
  // Verify the kind of weird params
  expect(changeHandler).toHaveBeenLastCalledWith(
    expect.anything(),
    props.options[2],
    'select-option',
    { option: props.options[2] },
  );

  // Check input value
  expect(screen.getByRole('textbox')).toHaveValue(props.options[2].label);

  // Remove value
  act(() => {
    fireEvent.click(screen.getByLabelText('Clear'));
  });

  expect(changeHandler).toHaveBeenCalledTimes(2);
  expect(changeHandler).toHaveBeenLastCalledWith(
    expect.anything(),
    null,
    'clear',
    undefined,
  );

  // Type value manually in input
  act(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Jean' } });
  });

  // Check that only options that match print
  expect(screen.getByText(props.options[0].label)).toBeInTheDocument();
  expect(screen.getByText(props.options[1].label)).toBeInTheDocument();
  expect(screen.queryByText(props.options[2].label)).not.toBeInTheDocument();
  expect(screen.queryByText(props.options[3].label)).not.toBeInTheDocument();

  // Click on option and check callback
  act(() => {
    fireEvent.click(screen.getByText(props.options[0].label));
  });

  expect(changeHandler).toHaveBeenCalledTimes(3);
  expect(changeHandler).toHaveBeenLastCalledWith(
    expect.anything(),
    props.options[0],
    'select-option',
    { option: props.options[0] },
  );
});

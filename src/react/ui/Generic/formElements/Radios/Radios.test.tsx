import React from 'react';
import {
  act, fireEvent, render, screen,
} from 'TestUtils';

import { RadiosBase } from './Radios';

const options = [
  { label: 'Option 1', value: 'id1' },
  { label: 'Option 2', value: 'id2' },
];

const defaultProps = {
  options,
  value: 'id1',
  label: 'LABEL_RADIO',
};

it('<Radios />', () => {
  const onChangeHandler = jest.fn();

  const props = {
    ...defaultProps,
    onChange: onChangeHandler,
  };

  render(
    <RadiosBase
      {...props}
    />,
  );

  // Check that both options are printed, as well as label
  expect(screen.getByText(props.label)).toBeInTheDocument();

  expect(screen.getByText(options[0].label)).toBeInTheDocument();
  expect(screen.getByText(options[1].label)).toBeInTheDocument();

  // Verify value
  expect(screen.getByLabelText(options[0].label)).toBeChecked();
  expect(screen.getByLabelText(options[1].label)).not.toBeChecked();

  // Trigger click
  expect(onChangeHandler).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.click(screen.getByLabelText(options[1].label));
  });

  expect(onChangeHandler).toHaveBeenCalledTimes(1);
  expect(onChangeHandler).toHaveBeenLastCalledWith(expect.anything(), options[1].value);
});

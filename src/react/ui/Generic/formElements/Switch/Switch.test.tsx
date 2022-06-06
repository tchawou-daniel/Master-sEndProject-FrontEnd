import React from 'react';
import {
  screen, render, fireEvent, act,
} from 'TestUtils';

import { Switch } from './Switch';
import { SwitchFieldBase } from './SwitchField';

const defaultProps = {
  checked: true,
};

it('<Switch />', () => {
  const onChangeHandler = jest.fn();
  const props = {
    ...defaultProps,
    onChange: onChangeHandler,
  };

  render(
    <Switch
      {...props}
    />,
  );

  // Check value
  expect(screen.getByRole('checkbox')).toBeChecked();

  // Trigger check
  expect(onChangeHandler).toHaveBeenCalledTimes(0);

  act(() => {
    fireEvent.click(screen.getByRole('checkbox'));
  });

  expect(onChangeHandler).toHaveBeenCalledTimes(1);
  expect(onChangeHandler).toHaveBeenLastCalledWith(expect.anything(), false);
});

it('<SwitchField />', () => {
  const onChangeHandler = jest.fn();
  const props = {
    ...defaultProps,
    onChange: onChangeHandler,
    label: 'SWITCH_LABEL',
    labelLeft: 'SWITCH_LEFT_LABEL',
  };

  render(
    <SwitchFieldBase
      {...props}
    />,
  );

  // Expect both labels
  expect(screen.getByText(props.label)).toBeInTheDocument();
  expect(screen.getByText(props.labelLeft)).toBeInTheDocument();

  // Check value
  expect(screen.getByRole('checkbox')).toBeChecked();
  expect(screen.getByLabelText(props.label)).toBeChecked();

  // Trigger check
  expect(onChangeHandler).toHaveBeenCalledTimes(0);

  act(() => {
    fireEvent.click(screen.getByRole('checkbox'));
  });

  expect(onChangeHandler).toHaveBeenCalledTimes(1);
  expect(onChangeHandler).toHaveBeenLastCalledWith(expect.anything(), false);
});

import React from 'react';
import {
  render, screen, act, fireEvent,
} from 'TestUtils';

import { Input } from './Input';

const defaultProps = {
  value: 'TEXT_INPUT',
};

it('<Input />', async () => {
  // Need to persist event from native inputs
  const onChangeHandler = jest.fn(e => e.persist());
  const props = {
    ...defaultProps,
    onChange: onChangeHandler,
  };

  render(<Input {...props} />);

  // Verify input value
  expect(screen.getByRole('textbox')).toHaveValue(props.value);

  expect(onChangeHandler).toHaveBeenCalledTimes(0);

  // Change input value
  const newInputValue = 'NEW_TEXT_VALUE';
  act(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: newInputValue } });
  });

  // Verify callback
  expect(onChangeHandler).toHaveBeenCalledTimes(1);
});

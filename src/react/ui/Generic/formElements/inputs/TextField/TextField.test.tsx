import React from 'react';
import {
  render, screen, act, fireEvent,
} from 'TestUtils';

import { TextFieldBase } from 'react/ui/generic/formElements/inputs/TextField/TextField';

const defaultProps = {
  id: 'TEXT_FIELD_ID',
  value: 'TEXT_INPUT',
  label: 'TEXT_FIELD_LABEL',
};

it('<TextField />', async () => {
  // Need to persist event from native inputs
  const onChangeHandler = jest.fn(e => e.persist());
  const props = {
    ...defaultProps,
    onChange: onChangeHandler,
  };

  render(<TextFieldBase {...props} />);

  // Verify label
  expect(screen.getByText(props.label)).toBeInTheDocument();

  // Verify input value
  expect(screen.getByRole('textbox')).toHaveValue(props.value);

  // Verify input value via label
  expect(screen.getByLabelText(props.label)).toHaveValue(props.value);

  expect(onChangeHandler).toHaveBeenCalledTimes(0);

  // Change input value
  const newInputValue = 'NEW_TEXT_VALUE';
  act(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: newInputValue } });
  });

  // Verify callback
  expect(onChangeHandler).toHaveBeenCalledTimes(1);
});

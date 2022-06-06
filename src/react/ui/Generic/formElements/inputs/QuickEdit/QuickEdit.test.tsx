import React from 'react';
import {
  render, screen, fireEvent,
} from 'TestUtils';

import QuickEdit from './QuickEdit';

const initialValue = 'Foo';
const onSubmitHandler = jest.fn();
const newValue = 'Bar';

it('<QuickEdit />', () => {
  render(
    <QuickEdit currentValue={initialValue} onSubmit={onSubmitHandler} />,
  );

  expect(screen.getByText(initialValue)).toBeInTheDocument();
  expect(onSubmitHandler).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button'));

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  fireEvent.click(input);
  fireEvent.change(input, { target: { value: newValue } });
  fireEvent.click(screen.getByRole('button'));
  expect(onSubmitHandler).toHaveBeenCalledTimes(1);
  expect(onSubmitHandler).toHaveBeenCalledWith(newValue);
});

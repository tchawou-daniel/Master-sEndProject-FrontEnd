import React from 'react';
import {
  act, fireEvent, render, screen,
} from 'TestUtils';

import InputWithCompilation from './InputWithCompilation';

const defaultProps = {
  value: 'BASE_VALUE',
  compiledValue: 'compiled value',
  label: 'INPUT_LABEL',
};

describe('<InputWithCompilation />', () => {
  it('<InputWithCompilation /> - base', () => {
    const onChangeHandler = jest.fn(e => e.persist());

    const props = {
      ...defaultProps,
      onChange: onChangeHandler,
    };

    render(
      <InputWithCompilation
        {...props}
      />,
    );

    // Label
    expect(screen.getByText(props.label)).toBeInTheDocument();

    // Value
    expect(screen.getByRole('textbox')).toHaveValue(props.value);

    // Focus
    act(() => {
      fireEvent.focus(screen.getByRole('textbox'));
    });

    // Check for value in input
    expect(screen.getByRole('textbox')).toHaveValue(props.value);

    // Check that compiled value is printing
    expect(screen.getByText(props.compiledValue)).toBeInTheDocument();

    // Change
    const newValue = 'NEW_INPUT_VALUE';

    expect(onChangeHandler).toHaveBeenCalledTimes(0);
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: newValue } });
    });

    expect(onChangeHandler).toHaveBeenCalledTimes(1);
  });

  it('<InputWithCompilation /> - showCompiledValueOnUnfocus', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
      showCompiledValueOnUnfocus: true,
    };

    render(
      <InputWithCompilation
        {...props}
      />,
    );

    // Value
    expect(screen.getByRole('textbox')).toHaveValue(props.compiledValue);

    // Focus
    act(() => {
      fireEvent.focus(screen.getByRole('textbox'));
    });

    // Check for value in input
    expect(screen.getByRole('textbox')).toHaveValue(props.value);

    // Check that compiled value is printing
    expect(screen.getByText(props.compiledValue)).toBeInTheDocument();
  });
});

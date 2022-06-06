import React from 'react';
import {
  render, screen, fireEvent, act,
} from 'TestUtils';

import SearchInput from './SearchInput';

const defaultProps = {
  value: 'search term',
};

describe('<SearchInput />', () => {
  it('<SearchInput /> - base', () => {
    const onChangeHandler = jest.fn();

    const props = {
      ...defaultProps,
      onChange: onChangeHandler,
    };

    render(
      <SearchInput
        {...props}
      />,
    );

    // Search button should be visible, input should not
    expect(screen.getByLabelText('Search')).toBeInTheDocument();

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    // deploy input
    act(() => {
      fireEvent.click(screen.getByLabelText('Search'));
    });

    // verify input and value are present
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(props.value);

    // Change input value
    expect(onChangeHandler).toHaveBeenCalledTimes(0);
    const newValue = 'NEW VALUE';

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: newValue } });
    });

    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(onChangeHandler).toHaveBeenLastCalledWith(newValue);

    // Clear and close
    act(() => {
      fireEvent.click(screen.getByLabelText('clear'));
    });

    expect(onChangeHandler).toHaveBeenCalledTimes(2);
    expect(onChangeHandler).toHaveBeenLastCalledWith('');

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('<SearchInput /> force visible', () => {
    const onChangeHandler = jest.fn();

    const props = {
      ...defaultProps,
      onChange: onChangeHandler,
      forceSearchVisible: true,
    };

    render(
      <SearchInput
        {...props}
      />,
    );

    // input should be visible
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    // Change input value
    expect(onChangeHandler).toHaveBeenCalledTimes(0);
    const newValue = 'NEW VALUE';

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: newValue } });
    });

    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(onChangeHandler).toHaveBeenLastCalledWith(newValue);

    // Clear
    act(() => {
      fireEvent.click(screen.getByLabelText('clear'));
    });

    expect(onChangeHandler).toHaveBeenCalledTimes(2);
    expect(onChangeHandler).toHaveBeenLastCalledWith('');

    // input should still be here
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});

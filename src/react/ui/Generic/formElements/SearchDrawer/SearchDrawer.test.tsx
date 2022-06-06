import React from 'react';
import {
  render, screen, act, fireEvent,
} from 'TestUtils';

import { SearchDrawer } from './SearchDrawer';

const defaultProps = {
  content: 'CONTENT',
  isLoading: true,
  filter: 'FILTER_VALUE',
};

describe('<SearchDrawer />', () => {
  it('<SearchDrawer /> - base', () => {
    const onChangeFilterHandler = jest.fn();
    const props = {
      ...defaultProps,
      onChangeFilter: onChangeFilterHandler,
    };

    render(
      <SearchDrawer
        {...props}
      >
        {props.content}
      </SearchDrawer>,
    );

    // Verify content
    expect(screen.getByText(props.content)).toBeInTheDocument();

    // Verify loader
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Verify filter value
    expect(screen.getByRole('textbox')).toHaveValue(props.filter);

    // Change filter value
    expect(onChangeFilterHandler).toHaveBeenCalledTimes(0);

    const newFilterValue = 'NEW_FILTER_VALUE';
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: newFilterValue } });
    });

    expect(onChangeFilterHandler).toHaveBeenCalledTimes(1);
    expect(onChangeFilterHandler).toHaveBeenCalledWith(newFilterValue);
  });

  it('<SearchDrawer /> - with no loader', () => {
    const props = {
      ...defaultProps,
      onChangeFilter: jest.fn(),
      isLoading: false,
    };

    render(
      <SearchDrawer
        {...props}
      />,
    );

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});

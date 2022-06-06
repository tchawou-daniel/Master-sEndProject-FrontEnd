import React from 'react';
import {
  screen, fireEvent, render, act,
} from 'TestUtils';

import Checkbox from './Checkbox';

const defaultProps = {
  checked: false,
  color: 'primary' as 'primary' | 'secondary' | 'tertiary',
};

describe('<Checkbox />', () => {
  it('<Checkbox /> - base', () => {
    const checkHandler = jest.fn();

    const props = {
      ...defaultProps,
      onChange: checkHandler,
      disabled: false,
    };

    render(<Checkbox {...props} />);

    // Checkbox should not be ticked
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toEqual(false);

    // Tick checkbox
    expect(checkHandler).toHaveBeenCalledTimes(0);
    act(() => {
      fireEvent.click(screen.getByRole('checkbox'));
    });
    expect(checkHandler).toHaveBeenNthCalledWith(1, expect.anything(), true);
  });

  it('<Checkbox /> - disabled', () => {
    const checkHandler = jest.fn();

    const props = {
      ...defaultProps,
      onChange: checkHandler,
      disabled: true,
    };

    const { container } = render(<Checkbox {...props} />);

    // Checkbox should not be ticked
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toEqual(false);

    // Check that the input has the disabled attribute
    // Warning: doing this as its the way M-UI manages disabled checkboxes
    expect(container.querySelector('input[disabled]')).toBeInTheDocument();
  });
});

import React from 'react';
import {
  render, screen, act, fireEvent,
} from 'TestUtils';

import RadioButtons from './RadioButtons';

const options = [
  { id: 'option1', label: 'label1', title: 'title1' },
  { id: 'option2', label: 'label2', title: 'title2' },
];

const defaultProps = {
  options,
  activeId: 'option1',
  type: 'button' as 'button',
};

it('<RadioButtons />', () => {
  const onClickHandler = jest.fn();

  const props = {
    ...defaultProps,
    onClickOption: onClickHandler,
  };

  render(
    <RadioButtons
      {...props}
    />,
  );

  // Check both options are here
  expect(screen.getByText(options[0].label)).toBeInTheDocument();
  expect(screen.getByText(options[1].label)).toBeInTheDocument();

  // Check that option1 is active and option2 is not
  expect(screen.getByLabelText(options[0].title)).toHaveAttribute('data-active', 'true');
  expect(screen.getByLabelText(options[1].title)).toHaveAttribute('data-active', 'false');

  // Change value
  expect(onClickHandler).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.click(screen.getByText(options[1].label));
  });

  expect(onClickHandler).toHaveBeenCalledTimes(1);
  expect(onClickHandler).toHaveBeenLastCalledWith(options[1].id);
});

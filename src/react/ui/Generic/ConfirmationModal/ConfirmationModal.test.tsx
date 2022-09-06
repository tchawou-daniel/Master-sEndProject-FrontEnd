import React from 'react';

import { render, screen, fireEvent } from '@app-web/testUtils/TestUtils';

import ConfirmationModal from './ConfirmationModal';

const defaultProps = {
  title: 'MODAL_TITLE',
  contentText: 'MODAL_CONTENT',
  confirmText: 'CONFIRM',
  cancelText: 'CANCEL',
};

describe('<ConfirmationModal />', () => {
  it('<ConfirmationModal /> - hidden', () => {
    const closeHandler = jest.fn();
    const confirmHandler = jest.fn();

    const props = {
      ...defaultProps,
      isOpened: false,
      handleClose: closeHandler,
      handleConfirm: confirmHandler,
    };

    render(<ConfirmationModal {...props} />);

    // Check that modal is not shown by default
    expect(screen.queryByText(props.title)).not.toBeInTheDocument();
  });

  it('<ConfirmationModal /> - content', () => {
    const closeHandler = jest.fn();
    const confirmHandler = jest.fn();

    const props = {
      ...defaultProps,
      isOpened: true,
      handleClose: closeHandler,
      handleConfirm: confirmHandler,
    };

    render(<ConfirmationModal {...props} />);

    // Check all content
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.contentText)).toBeInTheDocument();
    expect(screen.getByText(props.confirmText)).toBeInTheDocument();
    expect(screen.getByText(props.cancelText)).toBeInTheDocument();
  });

  it('<ConfirmationModal /> - Handlers', () => {
    const closeHandler = jest.fn();
    const confirmHandler = jest.fn();

    const props = {
      ...defaultProps,
      isOpened: true,
      handleClose: closeHandler,
      handleConfirm: confirmHandler,
    };

    render(<ConfirmationModal {...props} />);

    // Check that modal is opened
    expect(screen.getByText(props.title)).toBeInTheDocument();

    // Click on confirm button
    expect(props.handleConfirm).toBeCalledTimes(0);
    fireEvent.click(screen.getByText(props.confirmText));
    expect(props.handleConfirm).toBeCalledTimes(1);

    // Click cancel button
    expect(props.handleClose).toBeCalledTimes(0);
    fireEvent.click(screen.getByText(props.cancelText));
    expect(props.handleClose).toBeCalledTimes(1);

    // Click close button
    fireEvent.click(screen.getByLabelText('close'));
    expect(props.handleClose).toBeCalledTimes(2);
  });

  it('<ConfirmationModal /> - Additional Actions', () => {
    const closeHandler = jest.fn();
    const confirmHandler = jest.fn();

    const action1Handler = jest.fn();
    const action2Handler = jest.fn();

    const props = {
      ...defaultProps,
      isOpened: true,
      handleClose: closeHandler,
      handleConfirm: confirmHandler,
      additionalActions: [
        { text: 'action1', callback: action1Handler },
        { text: 'action2', callback: action2Handler },
      ],
    };

    render(<ConfirmationModal {...props} />);

    // Check that modal is opened
    expect(screen.getByText(props.title)).toBeInTheDocument();

    // Verify non callback has been called
    expect(props.additionalActions[0].callback).toBeCalledTimes(0);
    expect(props.additionalActions[1].callback).toBeCalledTimes(0);

    // Click on action1 + verify handlers
    fireEvent.click(screen.getByText(props.additionalActions[0].text));
    expect(props.additionalActions[0].callback).toBeCalledTimes(1);
    expect(props.additionalActions[1].callback).toBeCalledTimes(0);

    // Click on action2 + verify handlers
    fireEvent.click(screen.getByText(props.additionalActions[1].text));
    expect(props.additionalActions[0].callback).toBeCalledTimes(1);
    expect(props.additionalActions[1].callback).toBeCalledTimes(1);

    // Verify other handlers
    expect(props.handleConfirm).toBeCalledTimes(0);
    expect(props.handleClose).toBeCalledTimes(0);
  });
});

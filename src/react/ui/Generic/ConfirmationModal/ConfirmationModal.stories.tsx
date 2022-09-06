import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import Button from '../Button/Button';

import ConfirmationModal, { useConfirmModal } from './ConfirmationModal';

export default {
  title: 'Generic/ConfirmationModal',
  component: ConfirmationModal,
} as Meta;

export const Example: Story = () => {
  const { openModal, controls } = useConfirmModal({ onConfirm: action('Confirmed'), onCancel: action('Cancelled') });

  return (
    <>
      <p>This modal comes with a custom hook to help you control it, see the Story for example.</p>
      <Button onClick={openModal}>Click me!</Button>
      <ConfirmationModal
        {...controls}
        title="Hello"
        confirmText="Proceed"
        cancelText="Abort"
        contentText="I'm blue dabadi dabada"
      />
    </>
  );
};

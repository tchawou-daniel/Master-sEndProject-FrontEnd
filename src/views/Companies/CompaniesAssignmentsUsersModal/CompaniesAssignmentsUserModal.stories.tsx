import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import { User } from 'types/users';

import lapin2 from 'react/ui/__mockdata__/lapin-2.jpg';

import { generateFakeList } from 'services/utils/testUtils';

import { CompaniesAssignmentsUsersModal } from './CompaniesAssignmentsUsersModal';

const users = generateFakeList<User>({ id: 'm', firstName: 'Michel', lastName: 'Manager' }, 25, { pictureURL: lapin2 });

export default {
  title: 'Business/Plans/PlanAssignments/CompaniesAssignmentsUsersModal',
  component: CompaniesAssignmentsUsersModal,
  argTypes: {
    onClickAdd: { action: 'onClickAdd' },
    isOpen: { action: 'isOpen' },
    onClose: { action: 'onClose' },
  },
  args: {
    users,
    isLoading: false,
  },
} as Meta;

export const Example: Story = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <CompaniesAssignmentsUsersModal
      users={args.users}
      onClickAdd={args.onClickAdd}
      onClose={toggleModal}
      isLoading={args.isLoading}
      isOpen
      {...args}
    />
  );
};

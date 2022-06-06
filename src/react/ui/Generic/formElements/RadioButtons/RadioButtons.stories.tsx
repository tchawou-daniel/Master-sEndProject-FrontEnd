import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState, useMemo } from 'react';

import { ReactComponent as GridView } from 'assets/images/customIcons/mdi_view_grid.svg';
import { ReactComponent as HeadlineView } from 'assets/images/customIcons/mdi_view_headline.svg';

import { useCustomIconStyles } from '../../../../../images/customIcons/_common';

import RadioButtons from './RadioButtons';

const options = [
  {
    id: 'm',
    label: 'Members',
  }, {
    id: 'p',
    label: 'Plans',
  }, {
    id: 'q',
    label: 'Quotas',
  },
];

export default {
  title: 'Generic/Form Elements/RadioButtons',
  component: RadioButtons,
  args: {
    options,
  },
} as Meta;

export const Buttons: Story = (args) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <RadioButtons
      options={args.options}
      activeId={activeId}
      onClickOption={setActiveId}
      type="button"
    />
  );
};
export const Chips: Story = (args) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <RadioButtons
      options={args.options}
      activeId={activeId}
      onClickOption={setActiveId}
      type="chip"
    />
  );
};
export const Icons: Story = () => {
  const iconClasses = useCustomIconStyles();

  const iconOptions = useMemo(() => [
    {
      id: 'grid',
      label: <GridView className={iconClasses.customIcon} />,
    },
    {
      id: 'headline',
      label: <HeadlineView className={iconClasses.customIcon} />,
    },
  ], [iconClasses]);

  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <RadioButtons
      options={iconOptions}
      activeId={activeId}
      onClickOption={setActiveId}
      type="icon"
    />
  );
};

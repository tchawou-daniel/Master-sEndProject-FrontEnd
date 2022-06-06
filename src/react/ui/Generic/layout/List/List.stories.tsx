import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { ListElement, List } from './List';

export default {
  title: 'Generic/Layout/List',
  component: List,
} as Meta;

export const Example: Story = () => (
  <List mode="vertical">
    <ListElement header>Cat1</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement header>Cat2</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
  </List>
);

export const HorizontalWrap: Story = () => (
  <List mode="horizontalWrap">
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
  </List>
);

// React beautiful dnd doesn't support horizontal dnd
// in a wrapped list. Sorry but we'll have an horizontal
// scrollbar.
// https://github.com/atlassian/react-beautiful-dnd/issues/316
export const HorizontalNoWrap: Story = () => (
  <List mode="horizontalNoWrap">
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
    <ListElement>Hello</ListElement>
    <ListElement>Hello2</ListElement>
    <ListElement>Hello3</ListElement>
  </List>
);

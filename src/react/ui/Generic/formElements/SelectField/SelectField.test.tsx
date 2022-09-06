import React from 'react';

import A11YLabel from '@app-web/react/ui/generic/A11YLabel';

import {
  act, fireEvent, render, screen, within,
} from '@app-web/testUtils/TestUtils';

import { SelectFieldBase } from './SelectField';

const textOptions = [
  { label: 'Option a', value: 'valueA' },
  { label: 'Option b', value: 'valueB' },
];

describe('<SelectField />', () => {
  it('<SelectField /> - simple', () => {
    const onChangeHandler = jest.fn();

    const props = {
      value: textOptions[0].value,
      onChange: onChangeHandler,
      options: textOptions,
    };

    render(
      <SelectFieldBase
        {...props}
      />,
    );

    // Check printed value
    expect(screen.getByText(textOptions[0].label)).toBeInTheDocument();
    expect(screen.queryByText(textOptions[1].label)).not.toBeInTheDocument();

    // Deploy options
    act(() => {
      fireEvent.mouseDown(screen.getByRole('button'));
    });

    const listbox = screen.getByRole('listbox');

    // Verify options
    expect(within(listbox).getByText(textOptions[0].label));
    expect(within(listbox).getByText(textOptions[1].label));

    // Verify callback
    expect(onChangeHandler).toHaveBeenCalledTimes(0);

    // Click on other option
    act(() => {
      fireEvent.click(within(listbox).getByText(textOptions[1].label));
    });

    // Verify callback
    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(onChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: textOptions[1].value,
        }),
      }),
      expect.anything(),
    );
  });

  // ALl options are HTML.
  // For testing purposes, the labels that are container in the HTML are also inside the `labels` attribute for better maintainability
  const compositeOptionGroups = [
    {
      label: 'GROUP 1',
      options: [
        {
          label: <div><span>OPTION A</span><span>CHOICEAA</span></div>, value: 'valueA', labels: ['OPTION A', 'CHOICEAA'], multipleComponent: 'RADIO',
        },
        { label: <div><span>OPTION B</span><span>CHOICEBB</span></div>, value: 'valueB', labels: ['OPTION B', 'CHOICEBB'] },
      ],
    },
    {
      label: 'GROUP 2',
      options: [
        { label: <div><span>OPTION C</span><span>CHOICECC</span></div>, value: 'valueC', labels: ['OPTION C', 'CHOICECC'] },
      ],
    },
  ];

  it('<SelectField /> - multiple, group and other props', () => {
    const onChangeHandler = jest.fn();
    const onDeleteHandler = jest.fn();

    const props = {
      id: 'SELECT_FIELD',
      value: [compositeOptionGroups[0].options[0].value],
      label: 'SELECT_FIELD_LABEL',
      optionGroups: compositeOptionGroups,
      onChange: onChangeHandler,
      actions: [{
        content: (
          <A11YLabel>
            Delete choices
          </A11YLabel>
        ),
        callback: onDeleteHandler,
      }],
      hasResetOption: true,
    };

    render(
      <SelectFieldBase
        {...props}
      />,
    );

    // Verify label
    expect(screen.getByText(props.label)).toBeInTheDocument();

    // Verify current value
    expect(screen.getByText(compositeOptionGroups[0].options[0].labels[0])).toBeInTheDocument();
    expect(screen.getByText(compositeOptionGroups[0].options[0].labels[1])).toBeInTheDocument();

    // Verify that other values are not printing
    expect(screen.queryByText(compositeOptionGroups[0].options[1].labels[0])).not.toBeInTheDocument();
    expect(screen.queryByText(compositeOptionGroups[0].options[1].labels[1])).not.toBeInTheDocument();

    expect(screen.queryByText(compositeOptionGroups[1].options[0].labels[0])).not.toBeInTheDocument();
    expect(screen.queryByText(compositeOptionGroups[1].options[0].labels[1])).not.toBeInTheDocument();

    // Deploy choices
    const buttons = screen.getAllByRole('button');
    act(() => {
      fireEvent.mouseDown(buttons.find(b => b.id === 'SELECT_FIELD')!);
    });

    const listbox = screen.getByRole('listbox');

    // Verify that all options are printing
    expect(within(listbox).getByText('None', { exact: false })).toBeInTheDocument();

    expect(within(listbox).getByText(compositeOptionGroups[0].label)).toBeInTheDocument();

    expect(within(listbox).getByText(compositeOptionGroups[0].options[0].labels[0])).toBeInTheDocument();

    expect(within(listbox).getByText(compositeOptionGroups[0].options[0].labels[1])).toBeInTheDocument();

    expect(within(listbox).getByText(compositeOptionGroups[0].options[1].labels[0])).toBeInTheDocument();
    expect(within(listbox).getByText(compositeOptionGroups[0].options[1].labels[1])).toBeInTheDocument();

    expect(within(listbox).getByText(compositeOptionGroups[1].label)).toBeInTheDocument();

    expect(within(listbox).getByText(compositeOptionGroups[1].options[0].labels[0])).toBeInTheDocument();
    expect(within(listbox).getByText(compositeOptionGroups[1].options[0].labels[1])).toBeInTheDocument();

    // Verify callback
    expect(onChangeHandler).toHaveBeenCalledTimes(0);

    // Click on an option
    act(() => {
      fireEvent.click(within(listbox).getByText(compositeOptionGroups[1].options[0].labels[0]));
    });

    // Verify callback
    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(onChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: compositeOptionGroups[1].options[0].value,
        }),
      }),
      expect.anything(),
    );
    expect(onDeleteHandler).toHaveBeenCalledTimes(0);

    // Click on delete button
    act(() => {
      fireEvent.click(screen.getByText('Delete choices'));
    });

    // Verify callbacks
    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(onDeleteHandler).toHaveBeenCalledTimes(1);

    // Deploy choices
    act(() => {
      fireEvent.mouseDown(buttons.find(b => b.id === 'SELECT_FIELD')!);
    });

    // Verify that choices are deployed
    expect(within(listbox).getByText('None', { exact: false })).toBeInTheDocument();

    // Verify callback
    expect(onChangeHandler).toHaveBeenCalledTimes(1);

    // Click on reset option
    act(() => {
      fireEvent.click(within(listbox).getByText('None', { exact: false }));
    });

    // Verify callback
    expect(onChangeHandler).toHaveBeenCalledTimes(2);
    expect(onChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: '',
        }),
      }),
      expect.anything(),
    );
  });

  it('<SelectField /> - renderOnlyLengthValue', () => {
    const onChangeHandler = jest.fn();

    const props = {
      value: [textOptions[0].label],
      onChange: onChangeHandler,
      options: textOptions,
      placeholder: 'types',
      isFilter: true,
      renderOnlyLengthValue: true,
    };

    render(
      <SelectFieldBase
        {...props}
      />,
    );

    // Deploy options
    act(() => {
      fireEvent.mouseDown(screen.getByRole('button'));
    });

    // Check printed value
    expect(screen.getByText(textOptions[0].label)).toBeInTheDocument();
    expect(screen.queryByText(textOptions[1].label)).toBeInTheDocument();

    const listbox = screen.getByRole('listbox');

    // Verify callback
    expect(onChangeHandler).toHaveBeenCalledTimes(0);

    // Click on other option
    act(() => {
      fireEvent.click(within(listbox).getByText(textOptions[1].label));
    });

    // Verify callback
    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(onChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: textOptions[1].value,
        }),
      }),
      expect.anything(),
    );
    expect(screen.getByText(`1 ${props.placeholder}`)).toBeInTheDocument();
  });
});

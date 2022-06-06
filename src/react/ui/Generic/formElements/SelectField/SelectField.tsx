import {
  MenuItem,
  Select,
  FormHelperText,
  SelectProps,
  ListSubheader,
  Box,
  Chip,
} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  flatten, isEmpty, lowerCase, startsWith,
} from 'lodash';
import React, {
  memo, FC, ReactNode, useCallback, useMemo, ReactElement, useState,
} from 'react';

import { eventStopPropagation, eventStopPropagationAndPreventDefault } from 'react/common/eventHelpers';
import { EmpreinttThemeType } from 'react/ui/branding/theme';
import SearchInput from 'react/ui/generic/formElements/inputs/SearchInput/SearchInput';

import { StringUtils } from '../../../../../types/StringUtils';
import { IconButton } from '../../Button/Button';
import InfoWithTooltip from '../../InfoWithTooltip';
import Checkbox from '../Checkbox/Checkbox';
import formikToMui from '../formikToMui';
import { InputLabel, Input, FormElementContainer } from '../inputs/Input/Input';

export const useSelectFieldStyles = makeStyles((theme: EmpreinttThemeType) => ({
  checkboxMultiple: {
    padding: theme.spacing(0.8),
  },
  listSubHeader: {
    backgroundColor: '#FFFFFF',
  },
  actions: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: -theme.spacing(0.3),
    marginRight: -theme.spacing(0.4),
  },
  actionButton: {
    padding: theme.spacing(1),
    margin: theme.spacing(-2, 0),
  },
  disabledOption: {
    opacity: 0.9,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
  additionalContent: {
    backgroundColor: theme.palette.divider,
  },
}));

export interface Option {
  value: string;
  label: any;
  componentWhenMultiple?: 'RADIO';
  disabled?: boolean;
}

export interface OptionGroup {
  label: string;
  options: Option[];
}

export interface SelectFieldBaseProps extends SelectProps {
  options?: Option[];
  optionGroups?: OptionGroup[];
  hasResetOption?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  help?: string;
  actions?: { content: ReactNode, callback: () => void }[];
  disabled?: boolean;
  additionalContent?: {
    start?: ReactNode;
    end?: ReactNode;
  };
  isSearchable?: boolean;
  searchWithAutocompletion?: boolean;
  renderItemValueOnSelectField?: boolean;
}

const renderOptions = (
  options: Option[],
  multiple: boolean | undefined,
  value: any,
  classes: any,
): ReactNode => options
  // Ensure that each option has value.
  .map((option) => {
    const MultipleComponent = option.componentWhenMultiple === 'RADIO' ? Radio : Checkbox;

    return (
      <MenuItem
        value={option.value}
        key={option.value}
        aria-label={typeof (option.label) === 'string' ? StringUtils.camelCase(option.label.trim()) : option.value}
        className={clsx(option.disabled && classes.disabledOption)}
      >
        {multiple ? (
          <MultipleComponent
            color="primary"
            checked={(value || []).includes(option.value)}
            className={classes.checkboxMultiple}
          />
        ) : null}
        {option.label}
      </MenuItem>
    );
  });

const renderOptionGroups = (
  optionGroups: OptionGroup[],
  multiple: boolean | undefined,
  value: any,
  classes: any,
): ReactNode => optionGroups
  .map(optionGroup => [
    <ListSubheader className={classes.listSubHeader} key={optionGroup.label}>
      <div
        onClick={eventStopPropagationAndPreventDefault}
        onKeyDown={eventStopPropagationAndPreventDefault}
        role="presentation"
      >
        {optionGroup.label}
      </div>
    </ListSubheader>,
    renderOptions(optionGroup.options, multiple, value, classes),
  ]);

/**
 * Check if option match search string.
 * @param o
 * @param search
 */

const optionMatchSearchPredicate = (o: Option, search: string | undefined, withAutocompletion: boolean | undefined) => {
  if (withAutocompletion) {
    return !search || lowerCase(o.label).includes(lowerCase(search));
  }
  return !search || startsWith(lowerCase(o.label), lowerCase(search));
};

export const SelectFieldBase: FC<SelectFieldBaseProps> = ({
  label,
  error,
  options,
  optionGroups,
  hasResetOption,
  placeholder,
  containerClassName,
  labelClassName,
  hidden,
  help,
  actions,
  additionalContent,
  isSearchable,
  searchWithAutocompletion,
  renderItemValueOnSelectField,
  ...rest
}) => {
  const [search, setSearch] = useState('');
  const classes = useSelectFieldStyles();

  const filteredOptions: Option[] = useMemo(
    () => ((search) ? (options || []).filter(o => optionMatchSearchPredicate(o, search, searchWithAutocompletion)) : (options || [])),
    [searchWithAutocompletion, options, search],
  );

  const filteredOptionGroups: OptionGroup[] = useMemo(
    () => ((search) ? (optionGroups || []).map(g => ({
      label: g.label,
      options: g.options.filter(o => optionMatchSearchPredicate(o, search, searchWithAutocompletion)),
    })).filter(g => !isEmpty(g.options)) : (optionGroups || [])),
    [searchWithAutocompletion, optionGroups, search],
  );

  const labelsMap = useMemo(
    () => ((filteredOptionGroups ? flatten([...filteredOptionGroups.map(g => g.options), ...(filteredOptions || [])]) : filteredOptions) || [])
      .reduce((acc: Record<string, string | ReactElement>, curr: Option) => {
        acc[curr.value] = curr.label;
        return acc;
      }, {} as Record<string, string | ReactElement>),
    [filteredOptions, filteredOptionGroups],
  );

  const renderValue = useCallback(
    (selected) => {
      if (selected === '' || (rest.multiple && selected.length === 0)) {
        return placeholder;
      }

      return (rest.multiple
        ? (selected as string[]).map(s => labelsMap[s] || '').map((el: string | ReactNode, idx: number, arr) => (
          !renderItemValueOnSelectField
            ? (
              <>
                {el}
                {idx < arr.length - 1 ? <span>, </span> : null}
              </>
            )
            : <Chip key={Object.keys(labelsMap).find(key => labelsMap[key] === el)} label={el} />
        ))
        : labelsMap[selected]);
    },
    [rest.multiple, labelsMap, placeholder, renderItemValueOnSelectField],
  );

  // We need this: M-UI uses aria-labelledBy on select, so we need to compute another id from the first one
  // To pass to the labelId prop (that will add it to the aria-labelledBy of the select)
  const labelId = useMemo(() => (rest?.id ? `${rest.id}_label` : undefined), [rest]);

  return (
    <FormElementContainer hidden={hidden} className={containerClassName} relative={!!actions}>
      {label && (
        <InputLabel
          className={labelClassName}
          htmlFor={rest?.id}
          id={labelId}
        >
          {label}{rest.required ? ' *' : null }
          {help && <InfoWithTooltip>{help}</InfoWithTooltip>}
        </InputLabel>
      )}
      {actions && (
        <Box className={classes.actions}>
          {(actions || []).map(({ content, callback }) => (
            <IconButton onClick={callback} className={classes.actionButton}>{content}</IconButton>
          ))}
        </Box>
      )}
      <Select
        input={<Input />}
        renderValue={renderValue}
        // If we pass a placeholder, we need to show it.
        displayEmpty={!!placeholder}
        labelId={labelId}
        {...rest}
      >

        {isSearchable && (
          <div
            onClick={eventStopPropagationAndPreventDefault}
            role="presentation"
          >
            <SearchInput
              value={search}
              onChange={setSearch}
              onClick={eventStopPropagationAndPreventDefault}
              onKeyDown={eventStopPropagation}
              forceSearchVisible
            />
          </div>
        )}

        {additionalContent?.start && (
          <li className={classes.additionalContent}>{additionalContent.start}</li>
        )}
        {hasResetOption && <MenuItem value="" key="">- {placeholder || 'None'} -</MenuItem>}

        {renderOptions(filteredOptions || [], rest.multiple, rest.value, classes)}
        {renderOptionGroups(filteredOptionGroups || [], rest.multiple, rest.value, classes)}
        {additionalContent?.end && (
          <li className={classes.additionalContent}>{additionalContent.end}</li>
        )}
      </Select>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormElementContainer>
  );
};

const SelectField = memo<SelectFieldBaseProps>(formikToMui(SelectFieldBase));

SelectField.displayName = 'SelectField';

export default SelectField;

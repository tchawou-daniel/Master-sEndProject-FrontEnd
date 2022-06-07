import React, { useCallback, useMemo } from 'react';

import { User } from 'types/users';

import Autocomplete from 'react/ui/Generic/formElements/AutoComplete/Autocomplete';
import { Input } from 'react/ui/Generic/formElements/inputs/Input/Input';

import { formatUserFullName } from 'services/users/users.service';

import { OptionType } from '../../../../../types/__common';

interface AutoCompleteUsersProps {
  users: User[];
  label?: string;
  ariaLabel?: string;
  onChange: (e: any, newValue: OptionType | null) => void;
  selectedUserId: string | null;
}

const renderInput = (params: any) => (
  <div ref={params.InputProps.ref}>
    <Input {...params.inputProps} />
  </div>
);

/**
 * Display an Automcomplete select box with list of users.
 * @param label
 * @param users
 * @param onChange
 * @param name
 * @constructor
 */
export const AutoCompleteUsers: React.FC<AutoCompleteUsersProps> = ({
  ariaLabel,
  label,
  users,
  selectedUserId,
  onChange,
}) => {
  const userOptions = useMemo(() => users.map(u => ({ value: u.id, label: formatUserFullName(u) })), [users]);

  const getOptionSelected = useCallback((option: { value: string, label: string }) => option.value === selectedUserId, [selectedUserId]);

  const currentValue = useMemo(
    () => (selectedUserId ? userOptions.find(o => o.value === selectedUserId) : undefined),
    [selectedUserId, userOptions],
  );

  return (
    <Autocomplete
      value={currentValue}
      label={label}
      options={userOptions}
      aria-label={ariaLabel}
      // Some values contains '/' in their label which produces a warning in the selection option,
      // and recommands implementing getOptionSelected.
      getOptionSelected={getOptionSelected}
      getOptionLabel={option => option.label}
      renderInput={renderInput}
      onChange={onChange}
    />
  );
};

import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import React, { ReactNode } from 'react';

import { FormElementContainer, InputLabel } from 'react/ui/generic/formElements/inputs/Input/Input';

interface Option {
  value: string;
  label: any;
}

interface AutocompleteFieldProps<T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  label?: React.ReactNode;
  renderInput: (params: AutocompleteRenderInputParams) => ReactNode,
  containerClassName?: string,
}

export const AutocompleteField = <
  T extends Option,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
  >({ label, containerClassName, ...rest }: AutocompleteFieldProps<T, Multiple, DisableClearable, FreeSolo>) => (
    <FormElementContainer className={containerClassName}>
      {label && <InputLabel>{label}</InputLabel>}
      <Autocomplete
        getOptionLabel={(option: Option) => option.label}
        size="small"
        {...rest}
      />
    </FormElementContainer>
  );

export default AutocompleteField;

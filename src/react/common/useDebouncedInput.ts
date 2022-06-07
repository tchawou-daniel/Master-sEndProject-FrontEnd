import { debounce } from 'lodash';
import { useCallback, useMemo } from 'react';

export default (
  onChangeInput: (value: string) => void,
  onDebouncedInput: (value: string) => void,
  debounceTime: number,
) => {
  const debouncedOnChange = useMemo(() => debounce(onDebouncedInput, debounceTime), [debounceTime, onDebouncedInput]);
  const onChange = useCallback((value) => {
    onChangeInput(value);
    debouncedOnChange(value);
  }, [debouncedOnChange, onChangeInput]);
  return { onChange };
};

import { MouseEvent, KeyboardEvent } from 'react';

export const eventPreventDefault = (e: MouseEvent<any> | KeyboardEvent<any>) => e?.preventDefault();
export const eventStopPropagation = (e: MouseEvent<any> | KeyboardEvent<any>) => e?.stopPropagation();
export const eventStopPropagationAndPreventDefault = (e: MouseEvent<any> | KeyboardEvent<any>) => {
  e?.stopPropagation();
  e?.preventDefault();
};

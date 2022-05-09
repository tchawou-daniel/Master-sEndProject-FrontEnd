import React, { FC } from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';

const StoreProvider: FC<{ store: any }> = ({ store, children }) => (
  <ReactReduxProvider store={store}>{children}</ReactReduxProvider>
);

export default StoreProvider;

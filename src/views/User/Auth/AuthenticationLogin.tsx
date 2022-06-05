import { useAuth0 } from '@auth0/auth0-react';
import React, { memo, useEffect } from 'react';

import useLoadingScreen from 'react/common/useLoadingScreen';

const AuthenticationLogin: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const { showLoading } = useLoadingScreen();
  useEffect(() => {
    showLoading();
    loginWithRedirect();
  });

  // Not returning anything since we're supposed to be redirected.
  return null;
};

export default memo(AuthenticationLogin);

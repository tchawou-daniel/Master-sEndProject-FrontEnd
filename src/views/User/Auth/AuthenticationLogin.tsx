import React, { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useLoadingScreen from 'react/common/useLoadingScreen';

const AuthenticationLogin: React.FC = () => {
  const { showLoading } = useLoadingScreen();
  const history = useHistory();

  useEffect(() => {
    showLoading();
    history.push('/auth/login/callback');
  });

  // Not returning anything since we're supposed to be redirected.
  return null;
};

export default memo(AuthenticationLogin);

import { User } from '@amal-ia/lib-types';

import { LOCAL_STORAGE_MOCK_TOKEN_KEY } from 'react/views/User/auth/testAuth';

const LOCAL_STORAGE_COMPANY_ID_KEY = 'companyId';
const LOCAL_STORAGE_USER_ID_KEY = 'userId';

/**
 * On load, check if local storage has the same companyId that current user.
 * If that's not the case, clear local storage data and register new companyId
 */
export const checkLocalStorageOnLoad = (
  currentUser: User,
) => {
  // Do not clear storage in Cypress tests, or else the robot won't be able to authenticate.
  if (localStorage.getItem(LOCAL_STORAGE_MOCK_TOKEN_KEY)) {
    return;
  }

  const currentUserTyped = (currentUser as User & { company?: { id: string }, companyId?: string });

  const currentUserCompanyId = currentUserTyped.companyId || currentUserTyped.company?.id;
  const currentUserId = currentUserTyped.id;

  if (currentUserCompanyId && localStorage.getItem(LOCAL_STORAGE_COMPANY_ID_KEY) !== currentUserCompanyId) {
    localStorage.clear();
    localStorage.setItem(LOCAL_STORAGE_COMPANY_ID_KEY, currentUserCompanyId);
  }
  if (currentUserId && localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY) !== currentUserId) {
    // Try to clear the Hubspot tokens from local storage
    (window as any)?.HubSpotConversations?.clear({ resetWidget: true });
    localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, currentUserId);
  }
};

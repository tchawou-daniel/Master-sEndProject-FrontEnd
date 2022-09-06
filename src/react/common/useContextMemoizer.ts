import { useMemo } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps -- We're supposed to only pass objects here, always the same keys.
export default <T extends Record<string, any>>(contextObjects: T) => useMemo(() => contextObjects, Object.values(contextObjects));

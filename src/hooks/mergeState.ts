import { useCallback, useState } from 'react';

const useMergeState = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);

  const mergeState = useCallback((newState) => {
    if (typeof newState === 'function') {
      setState((currentState: T) => ({
        ...currentState,
        ...newState(currentState),
      }));
    } else {
      setState((currentState: T) => ({ ...currentState, ...newState }));
    }
  }, []);

  return [state, mergeState] as [T, React.Dispatch<React.SetStateAction<T>>];
};

export default useMergeState;

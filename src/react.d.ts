import * as React from 'react';

declare module 'react' { // v16.7.0-alpha

  type HookState<T> = T & { };

  export function useState<S>(initialState: S): [HookState<S>, (state: S) => void];
  export function useEffect(effect: () => void, dependencies?: HookState<any>[]): void;
  export function useReducer<S, A>(reducer: (state: S, action: A) => S, initialState: S): [HookState<S>, (action: A) => void];
  export function useCallback(callback: () => void, dependencies?: HookState<any>[]): void;
  export function useMemo<S>(create: () => S, dependencies?: HookState<any>[]): HookState<S>;
}

import { flow, remoteData, task } from '@code-expert/prelude';
import React from 'react';

import { Exception, fromError } from '../../domain/exception';
import { useRaceState } from './useRaceState';

/**
 * Run a `Task` and represent the states before, during and after as `RemoteData`.
 */
export function useRemoteData<P, A>(run: (props: P) => task.Task<A>) {
  const [state, mkSetState] = useRaceState<remoteData.RemoteData<Exception, A>>(remoteData.initial);

  const { current } = React.useRef({
    run,
    refresh(props: P) {
      const setState = mkSetState();
      setState(remoteData.pending);
      void (async () => {
        try {
          const result: A = await task.run(current.run(props));
          setState(remoteData.success(result));
        } catch (e) {
          setState(remoteData.failure(fromError(e)));
        }
      })();
    },
  });

  return [state, current.refresh] as const;
}

/**
 * Run a `Task` and represent the states before, during and after as `RemoteData`. When refreshing,
 * keep returning stale data until new results are available, according to Stale-While-Revalidate.
 */
export function useCachedRemoteData<P, A>(run: (props: P) => task.Task<A>) {
  const [state, mkSetState] = useRaceState<remoteData.RemoteData<Exception, A>>(remoteData.initial);
  const strategy = remoteData.staleWhileRevalidate<Exception, A>;

  const { current } = React.useRef({
    run,
    refresh(props: P) {
      const setState = flow(strategy, mkSetState());
      setState(remoteData.pending);
      void (async () => {
        try {
          const result: A = await task.run(current.run(props));
          setState(remoteData.success(result));
        } catch (e) {
          setState(remoteData.failure(fromError(e)));
        }
      })();
    },
  });

  current.run = run;

  return [state, current.refresh] as const;
}

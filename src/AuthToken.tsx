import React, { useRef } from 'react';
import { message } from 'antd';
import { useGlobalContextWithActions } from './ui/components/GlobalContext';
import { AccessToken } from './domain/AuthToken';
import { either, pipe } from './prelude';

export const AuthTokenManager = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [state, setState] = useGlobalContextWithActions();

  const save = () =>
    pipe(
      ref.current?.value,
      AccessToken.decode,
      either.fold(
        (err) => {
          void message.warning('Invalid token');
          console.error(err);
        },
        (accessToken) => setState({ accessToken }),
      ),
    );

  return (
    <div className="container">
      <h1>AuthToken</h1>

      <div className="row">{state.accessToken}</div>
      <div className="row">
        <div>
          <input ref={ref} id="greet-input" placeholder="Enter a token …" />
          <button type="button" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

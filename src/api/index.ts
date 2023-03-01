import { getVersion } from '@tauri-apps/api/app';
import { invoke } from '@tauri-apps/api';
import { Store as TauriStore } from 'tauri-plugin-store-api';
import { iots, option, pipe, task, taskOption } from '../prelude';

const store = new TauriStore('.settings.dat');

export interface Api {
  getVersion(): Promise<string>;
  greet(name: string): Promise<string>;
  settingRead<T>(key: string, decoder: iots.Decoder<unknown, T>): taskOption.TaskOption<T>;
  settingWrite(key: string, value: unknown): task.Task<void>;
}

export const api: Api = {
  getVersion,
  greet: (name) => invoke('greet', { name }),
  settingRead: (key, decoder) =>
    pipe(() => store.get(key), task.map(decoder.decode), task.map(option.fromEither)),
  settingWrite: (key, value) => () =>
    value != null
      ? store.set(key, value).then(() => store.save())
      : store.delete(key).then(() => store.save()),
};
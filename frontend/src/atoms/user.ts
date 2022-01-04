import { atom } from 'recoil';
import { user } from '../types';

export const userState = atom<user | undefined>({
  key: 'userState',
  default: undefined
});

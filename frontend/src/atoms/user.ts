import { atom } from 'recoil';
import { user } from '../types';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom<user | undefined>({
  key: 'userState',
  default: undefined,
  effects_UNSTABLE: [persistAtom]
});

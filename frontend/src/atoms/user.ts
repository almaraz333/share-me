import { atom } from 'recoil';

export const userState = atom<{ googleId: string } | undefined>({
  key: 'userStae',
  default: undefined
});

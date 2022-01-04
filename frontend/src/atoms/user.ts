import { atom } from 'recoil';

export const userState = atom<
  { googleId: string; imageUrl: string } | undefined
>({
  key: 'userStae',
  default: undefined
});

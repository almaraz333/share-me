export type user = { googleId: string; imageUrl: string; name: string };

export type pin = {
  _id: string;
  title: string;
  about: string;
  destination: string;
  userId: string;
  image: any;
  postedBy: user;
  save: { postedBy: user; userId: string };
};

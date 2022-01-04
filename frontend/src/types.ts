export type user = { googleId: string; imageUrl: string; name: string };

export type pin = {
  _id: string;
  title: string;
  about: string;
  destination: string;
  userId: string;
  image: any;
  postedBy: {
    _id: string;
    image: string;
    userName: string;
    userId: string;
  };
  save: {
    postedBy: {
      _id: string;
      image: string;
      userName: string;
      userId: string;
    } | null;
  }[];
};

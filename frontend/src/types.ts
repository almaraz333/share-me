export type user = { googleId: string; imageUrl: string; name: string };

export type postedBy = {
  _id: string;
  image: string;
  userName: string;
  userId: string;
};

export type Comment = {
  comment: string;
  postedBy: postedBy;
};

export type pin = {
  _id: string;
  title: string;
  about: string;
  destination: string;
  userId: string;
  comments: Comment[];
  image: any;
  postedBy: postedBy;
  save: {
    postedBy: postedBy | null;
  }[];
};

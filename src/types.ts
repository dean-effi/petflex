export type UserDetails = {
  username: string;
  password: string;
};
export type User = {
  _id: string;
  username: string;
  notifications: any[];
};

export type QueryError = {
  message: string;
  status?: number;
};
export type PostType = {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  name: string;
  description: string;
  image: string;
  imageName: string;
  gender: "male" | "female" | "unknown";
  birthDate: string;
  petType: petsType;
  likes: string[];
  commentsCount: number;
  createdAt: string;
  __v: number;
  likesCount: number;
  age: {
    years: number;
    months: number;
    days: number;
  };
  id: string;
};

export type petsType =
  | "dog"
  | "cat"
  | "lizard"
  | "hamster"
  | "rabbit"
  | "other";

export type Comment = {
  content: string;
  user: {
    username: string;
  };
  postId: string;
  parentId: string | null;
  hasReplies: boolean;
  _id: string;
};

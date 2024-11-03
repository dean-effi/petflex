export type UserDetails = {
  username: string;
  password: string;
};
export type User = {
  _id: string;
  username: string;
  notifications: any[];
  admin?: boolean;
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
  isDead: boolean;
};

export type petsType =
  | "dog"
  | "cat"
  | "lizard"
  | "hamster"
  | "rabbit"
  | "other";

export type CommentType = {
  content: string;
  user: {
    username: string;
    _id: string;
  };
  postId: string;
  parentId: string | null;
  hasReplies: boolean;
  _id: string;
  createdAt: string;
  available: boolean;
};

export type PostSubmitionObject = {
  name: string;
  description: string;
  birthDate: string;
  petType: string;
  gender: string;
  isDead: boolean;
  image?: null | File | Blob;
};

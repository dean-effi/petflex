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

import { createContext } from "react";
import { User } from "./types";

export const appContext = createContext<{ user: User | undefined }>({
  user: undefined,
});

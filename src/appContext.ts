import { createContext } from "react";
import { User } from "./types";

type AppContextType = {
  userQuery: {
    user: User | undefined;
    userLoading: boolean;
  };
  isDark: boolean;
};

export const appContext = createContext<AppContextType>({
  userQuery: { user: undefined, userLoading: false },
  isDark: false,
});

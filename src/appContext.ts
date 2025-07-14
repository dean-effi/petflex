import { createContext } from "react";
import { AppContextType } from "./types";

export const appContext = createContext<AppContextType>({
  userQuery: { user: undefined, userLoading: false },
  isDark: false,
  setIsDark: null,
});

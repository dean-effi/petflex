import { ReactNode } from "react";
import { useEffect, useState } from "react";
import { fetchApi } from "./fetchApi";
import { useQuery } from "@tanstack/react-query";
import { User } from "./types";
import { appContext } from "./appContext";
export default function AppContextWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [isDark, setIsDark] = useState(true);

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: () =>
      fetchApi(
        "users",
        {
          method: "GET",
          body: null,
        },
        true
      ),
    // refetchInterval: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 30,
    retry: false,
    // refetchInterval: 1000 * 3,
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    setIsDark(document.documentElement!.classList[0] === "dark");
  }, []);

  return (
    <appContext.Provider
      value={{
        userQuery: {
          user,
          userLoading,
        },
        isDark,
        setIsDark,
      }}>
      {children}
    </appContext.Provider>
  );
}

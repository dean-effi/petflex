import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useQuery } from "@tanstack/react-query";
import { User } from "./types";
import { appContext } from "./appContext";
import PostFormPage from "./pages/PostFormPage";
import { fetchApi } from "./fetchApi";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import OnHold from "./pages/OnHold";
import ProfilePage from "./pages/ProfilePage";
export default function App() {
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    setIsDark(document.documentElement!.classList[0] === "dark");
  }, []);

  const [isDark, setIsDark] = useState(true);

  const { data: user, isLoading: isUserLoading } = useQuery<User>({
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
  return (
    <div className="h-full min-h-screen w-full bg-stone-50 text-neutral-950 dark:bg-gradient-to-b dark:from-zinc-900 dark:to-[#181826] dark:text-stone-50">
      <appContext.Provider
        value={{
          userQuery: {
            user: user,
            userLoading: isUserLoading,
          },
          isDark: isDark,
        }}>
        <Navbar {...{ isDark, setIsDark }} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isLogged={Boolean(isUserLoading === false && user)}
              />
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post" element={<PostFormPage />} />
          <Route path="/onhold" element={<OnHold />} />

          <Route path="/:postId" element={<PostPage />} />
        </Routes>
      </appContext.Provider>
    </div>
  );
}

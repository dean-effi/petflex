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
export default function App() {
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
    <div className="h-full min-h-screen w-full bg-stone-50 text-neutral-950">
      <appContext.Provider
        value={{
          userQuery: {
            user: user,
            userLoading: isUserLoading,
          },
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post" element={<PostFormPage />} />
          <Route path="/:postId" element={<PostPage />} />
        </Routes>
      </appContext.Provider>
    </div>
  );
}

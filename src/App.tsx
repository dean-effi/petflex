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
export default function App() {
  const userQuery = useQuery<User>({
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
    // refetchInterval: 1000 * 3,
  });

  return (
    <div className="h-full min-h-screen w-full bg-stone-100 text-blue-800">
      <appContext.Provider
        value={{
          userQuery: {
            user: userQuery.data,
            userLoading: userQuery.isLoading,
          },
        }}
      >
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="p-3 text-7xl font-bold">
                Welcome to petflex!{" "}
                {userQuery.data && userQuery.data.username}!
              </h1>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post" element={<PostFormPage />} />
          <Route path="/:postId" element={<PostPage />} />
        </Routes>
      </appContext.Provider>
    </div>
  );
}

// async function loadUser() {
//   const token = localStorage.getItem("token");
//   try {
//     if (!token) {
//       return null;
//     }
//     console.log("has token!!!!!!!!!");
//     const response = await fetch(
//       import.meta.env.VITE_ENDPOINT + "users",
//       {
//         method: "GET",
//         headers: {
//           authorization: token,
//         },
//         body: null,
//       }
//     );
//     const responseJson = await response.json();
//     return responseJson;
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     throw new Error("error retreving the user");
//   }
// }

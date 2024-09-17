import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { User } from "./types";
export default function App() {
  const userQuery = useQuery<User>({
    queryKey: ["user"],
    queryFn: loadUser,
    refetchInterval: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 30,
    // refetchInterval: 1000 * 3,
  });

  return (
    <div className="h-full min-h-screen w-full bg-stone-100 text-blue-800">
      <appContext.Provider value={{ user: userQuery.data }}>
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
        </Routes>
      </appContext.Provider>
    </div>
  );
}

export const appContext = createContext<{ user: User | undefined }>({
  user: undefined,
});

async function loadUser() {
  console.log("loading user...");
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      return null;
    }
    const response = await fetch(
      import.meta.env.VITE_ENDPOINT + "users",
      {
        method: "GET",
        headers: {
          authorization: token,
        },
      }
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw new Error("error retreving the user");
  }
}

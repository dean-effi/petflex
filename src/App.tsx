import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: loadUser,
    refetchInterval: 1000 * 60 * 60,
    // refetchInterval: 1000 * 3,
  });
  console.log("re-rendered!!! userquery:", userQuery.data);
  return (
    <>
      <div className="h-full min-h-screen w-full bg-stone-100 text-blue-800">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="p-3 text-7xl font-bold">
                Welcome to petflex!
              </h1>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

async function loadUser() {
  console.log("loading user...");
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      return null;
    }
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw new Error("error retreving the user");
  }
}

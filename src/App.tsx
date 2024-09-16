import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
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

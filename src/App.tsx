import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="text-blue-800">
        <Routes>
          <Route path="/signup" element={<UserForm />} />
        </Routes>
        <Outlet />
      </main>
    </>
  );
}

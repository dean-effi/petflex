import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <img src="/public/logo.svg" />
      <Outlet />
    </>
  );
}

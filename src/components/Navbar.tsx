import { NavLink } from "react-router-dom";
import burger from "../assets/burger.svg";
import moon from "../assets/moon.svg";
import { queryClient } from "../main";
import { useContext } from "react";
import { appContext } from "../App";

export default function Navbar() {
  function logout() {
    localStorage.removeItem("token");
    queryClient.setQueryData(["user"], null);
  }
  const { user } = useContext(appContext);
  return (
    <div className="sticky top-0 z-10 flex gap-4 bg-blue-800 text-stone-100 shadow-md shadow-blue-200">
      {/* mobile Nav */}
      <button className="rounded-md hover:bg-blue-900 lg:hidden">
        <img src={burger} alt="open menu" />
      </button>
      {/* large menu */}
      <nav className="hidden w-full justify-between p-4 px-6 lg:flex">
        <NavLink
          className={"text-3xl font-bold tracking-widest"}
          to={""}
        >
          petflex
        </NavLink>
        <ul className="flex items-center gap-4 text-2xl font-semibold">
          <li>
            <NavLink to={""}>Home</NavLink>
          </li>
          {user ? (
            <li>
              <button onClick={logout}>Log out</button>
            </li>
          ) : (
            <>
              <li>
                <NavLink to={"login"}>Log in</NavLink>
              </li>
              <li>
                <NavLink to={"signup"}>Sign up</NavLink>
              </li>
            </>
          )}

          <button>
            <img src={moon} alt="moon icon" />
          </button>
        </ul>
      </nav>
    </div>
  );
}

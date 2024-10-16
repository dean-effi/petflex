import { NavLink } from "react-router-dom";
import burger from "../assets/burger.svg";

import moon from "../assets/moon.svg";

import logo from "../assets/logo.svg";

import { queryClient } from "../main";
import { useContext, useRef, useState } from "react";
import { appContext } from "../appContext";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const everOpened = useRef(false);

  function logout() {
    localStorage.removeItem("token");
    queryClient.setQueryData(["user"], null);
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  }
  const { user } = useContext(appContext).userQuery;
  const smallNavStateClass =
    everOpened.current === false
      ? " hidden"
      : isOpen
        ? " nav-open"
        : " nav-close";

  return (
    <div className="sticky top-0 z-10 flex gap-4 bg-gradient-to-b from-stone-50 to-stone-200 text-violet-800 shadow-md">
      <button
        onClick={() => {
          if (!everOpened.current) everOpened.current = true;
          setIsOpen(!isOpen);
        }}
        className="ml-2 rounded-md py-1 hover:bg-stone-300 lg:hidden"
      >
        <img src={burger} alt="open menu" />
      </button>
      {/* small screen collapseable Nav */}
      <nav
        className={
          "absolute left-0 grid h-[100vh] w-[40%] min-w-[270px] grid-rows-[100px,1fr,100px] justify-between border-r bg-stone-100 p-2 shadow-lg lg:hidden" +
          smallNavStateClass
        }
      >
        <button
          onClick={e => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="self-start justify-self-start rounded-md hover:bg-stone-300"
        >
          <img src={burger} alt="close menu " />
        </button>
        <ul className="flex flex-col gap-6 p-4 pt-0 text-2xl font-bold md:gap-8 md:text-3xl">
          <NavbarLinks
            user={user}
            setIsOpen={setIsOpen}
            logout={logout}
          />
        </ul>
        <button className="self-start p-4 pt-0">
          <img src={moon} className="w-10 md:w-12" alt="moon icon" />
        </button>
      </nav>
      {/* large menu */}
      <nav className="hidden w-full items-center justify-between p-4 px-6 lg:flex xl:px-8 2xl:px-9">
        <NavLink to={""} aria-label="home">
          <img src={logo} alt="petflex logo" />
        </NavLink>
        <ul className="flex gap-8 text-2xl font-bold">
          <NavbarLinks user={user} logout={logout} />
          <li>
            <button className="pb-[2px]">
              <img className="h-[31px]" src={moon} alt="moon icon" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

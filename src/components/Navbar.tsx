import { NavLink } from "react-router-dom";
import burger from "../assets/burger.svg";
import burgerBlue from "../assets/burger-blue.svg";

import moon from "../assets/moon.svg";
import moonBlue from "../assets/moon-blue.svg";

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
  }
  const { user } = useContext(appContext).userQuery;
  const smallNavStateClass =
    everOpened.current === false
      ? " hidden"
      : isOpen
        ? " nav-open"
        : " nav-close";

  return (
    <div className="sticky top-0 z-10 flex gap-4 bg-blue-800 text-stone-100 shadow-md shadow-blue-200">
      <button
        onClick={() => {
          if (!everOpened.current) everOpened.current = true;
          setIsOpen(!isOpen);
        }}
        className="rounded-md py-1 hover:bg-blue-900 lg:hidden"
      >
        <img src={burger} alt="open menu" />
      </button>
      {/* small screen collapseable Nav */}
      <nav
        className={
          "absolute left-0 grid h-[100vh] w-[40%] min-w-[270px] grid-rows-[100px,1fr,100px] justify-between border-r bg-stone-100 p-2 text-blue-800 shadow-lg lg:hidden" +
          smallNavStateClass
        }
      >
        <button
          onClick={e => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="self-start justify-self-start rounded-md hover:bg-stone-400"
        >
          <img src={burgerBlue} alt="close menu " />
        </button>
        <ul className="flex flex-col gap-6 p-4 pt-0 text-2xl font-bold md:gap-8 md:text-3xl">
          <NavbarLinks
            user={user}
            setIsOpen={setIsOpen}
            logout={logout}
          />
        </ul>
        <button className="self-start p-4 pt-0">
          <img
            src={moonBlue}
            className="w-10 md:w-12"
            alt="moon icon"
          />
        </button>
      </nav>
      {/* large menu */}
      <nav className="hidden w-full justify-between p-4 px-6 lg:flex">
        <NavLink
          className={"text-3xl font-bold tracking-widest"}
          to={""}
        >
          petflex
        </NavLink>
        <ul className="flex items-center gap-4 text-2xl font-semibold">
          <NavbarLinks user={user} logout={logout} />

          <button>
            <img src={moon} alt="moon icon" />
          </button>
        </ul>
      </nav>
    </div>
  );
}

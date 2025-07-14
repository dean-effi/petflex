import { NavLink } from "react-router-dom";
import Burger from "../assets/burger.svg?react";

import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";

import Logo from "../assets/logo.svg?react";

import { queryClient } from "../main";
import { useContext, useRef, useState } from "react";
import { appContext } from "../appContext";
import NavbarLinks from "./NavbarLinks";
import Profile from "../assets/profile.svg?react";
export default function Navbar() {
  const { isDark, setIsDark } = useContext(appContext);
  const [isOpen, setIsOpen] = useState(false);
  const everOpened = useRef(false);

  function changeTheme() {
    setIsDark!(!isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  }

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
    <div className="sticky top-0 z-50 flex gap-4 bg-gradient-to-b from-stone-50 to-stone-200 text-violet-800 shadow-md dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-800 dark:text-stone-50 dark:shadow-[#141419] dark:hover:bg-[#29292d]">
      <button
        onClick={() => {
          if (!everOpened.current) everOpened.current = true;
          setIsOpen(!isOpen);
        }}
        aria-label="open navbar"
        className="ml-2 rounded-md py-1 hover:bg-stone-300 lg:hidden dark:hover:bg-zinc-700">
        <Burger />
      </button>
      {/* small screen collapseable Nav */}
      <nav
        className={
          "absolute left-0 grid h-[100vh] w-[40%] min-w-[270px] grid-rows-[100px,1fr,180px] justify-between border-r bg-stone-100 p-2 shadow-lg lg:hidden dark:border-r-zinc-700 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 dark:shadow-[#141419]" +
          smallNavStateClass
        }>
        <button
          onClick={e => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          aria-label="close navbar"
          className="self-start justify-self-start rounded-md hover:bg-stone-300 dark:hover:bg-zinc-700">
          <Burger />
        </button>
        <ul className="flex flex-col gap-6 p-4 pt-0 text-2xl font-bold md:gap-8 md:text-3xl">
          <NavbarLinks
            user={user}
            setIsOpen={setIsOpen}
            logout={logout}
          />
        </ul>
        <div className="flex items-start">
          <button
            aria-label={
              "Change color theme to " + isDark ? "dark" : "light"
            }
            onClick={changeTheme}
            className="p-4 pt-0">
            <img src={isDark ? sun : moon} className="w-12" alt="" />
          </button>
          {user && (
            <NavLink
              onClick={() => setIsOpen(false)}
              to={"/profile"}
              aria-label="profile">
              <Profile className="relative -top-0.5 h-14 w-14 fill-violet-800 dark:fill-stone-50" />
            </NavLink>
          )}
        </div>
      </nav>
      {/* large menu */}
      <nav
        className={`hidden w-full items-start justify-between px-6 pt-5 lg:flex xl:px-8 2xl:px-9 ${user ? "pb-1" : "pb-3"}`}>
        <NavLink to={""} aria-label="home">
          <Logo className="text-violet-800 dark:text-stone-50" />
        </NavLink>
        <ul className="flex gap-8 text-2xl font-bold">
          <NavbarLinks user={user} logout={logout} />
          <li>
            <button
              aria-label={`Change color theme to ${isDark ? "light" : "dark"}`}
              className="pb-[2px]"
              onClick={changeTheme}>
              <img
                className="h-[31px]"
                src={isDark ? sun : moon}
                alt=""
              />
            </button>
          </li>
          {user && (
            <li className="relative -left-[10px] -top-[6px]">
              <NavLink to={"/profile"} aria-label="profile">
                <Profile className="h-11 w-11 fill-violet-800 dark:fill-stone-50" />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

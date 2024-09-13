import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="">
      <ul className="flex gap-4 bg-blue-800 p-2 py-3 text-stone-100">
        <li>
          <NavLink
            className={"text-lg font-bold tracking-wide"}
            to={"login"}
          >
            petflex
          </NavLink>
        </li>
        {/* <li>
          <NavLink to={"login"}>login</NavLink>
        </li>
        <li>
          <NavLink to={"register"}>register</NavLink>
        </li>
        <li>
          <NavLink to={"home"}>home</NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

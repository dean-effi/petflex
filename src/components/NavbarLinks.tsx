import { NavLink } from "react-router-dom";
import { User } from "../types";

type NavbarLinksProps = {
  user: User | undefined;
  logout: () => void;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavbarLinks({
  user,
  logout,
  setIsOpen,
}: NavbarLinksProps) {
  function onLiClick() {
    setIsOpen && setIsOpen(prev => !prev);
  }
  return (
    <>
      <li onClick={onLiClick}>
        <NavLink to={""}>Home</NavLink>
      </li>
      {user ? (
        <li onClick={onLiClick}>
          <button onClick={logout}>Log out</button>
        </li>
      ) : (
        <>
          <li onClick={onLiClick}>
            <NavLink to={"login"}>Log in</NavLink>
          </li>
          <li onClick={onLiClick}>
            <NavLink to={"signup"}>Sign up</NavLink>
          </li>
        </>
      )}
    </>
  );
}

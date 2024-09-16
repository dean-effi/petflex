import { useState } from "react";
import { Link } from "react-router-dom";
import { UserDetails } from "../types";

type UserFormProps = {
  onFormSubmit: (userDetails: UserDetails) => void;
  formType: "login" | "signup";
  errorMsg: string | null;
  isPending: boolean;
};

export default function UserForm({
  onFormSubmit,
  formType,
  errorMsg,
  isPending,
}: UserFormProps) {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
    return;
  }
  return (
    <main className="relative m-auto w-[300px] overflow-visible p-8 py-10 text-blue-800 sm:w-[400px] sm:text-xl md:text-2xl lg:w-[455px] lg:text-[28px]">
      <section
        aria-label="header"
        className="header text-center font-extrabold"
      >
        <h1 className="grid">
          {formType === "signup" ? "Sign up to" : "Log in to"}
          <span className="text-6xl tracking-widest sm:text-7xl">
            {" "}
            petflex
          </span>
        </h1>
        <img
          className="m-auto mt-2 w-[135px] sm:w-[153px]"
          src="/logo.svg"
          alt="petflex logo"
        />
      </section>
      <section className="registeration mt-12 lg:mt-14">
        <form
          action=""
          onSubmit={e => {
            e.preventDefault();
            onFormSubmit(userDetails);
          }}
          className="mt-auto grid gap-5 sm:gap-6 lg:gap-7"
        >
          <label className="grid gap-3 font-bold sm:gap-4 lg:gap-5">
            Username:
            <input
              name="username"
              minLength={3}
              maxLength={20}
              onChange={onInputChange}
              value={userDetails.username}
              type="text"
              className="rounded-lg bg-stone-300 p-2 font-normal text-stone-800"
            />
          </label>
          <label className="grid gap-3 font-bold sm:gap-4 lg:gap-5">
            Password:
            <input
              name="password"
              minLength={5}
              maxLength={40}
              onChange={onInputChange}
              value={userDetails.password}
              type="password"
              className="rounded-lg bg-stone-300 p-2 font-normal text-stone-800"
            />
          </label>
          <div className="pb-2 text-center font-bold text-red-800 xl:text-2xl">
            {errorMsg && <p className="">{errorMsg}</p>}
          </div>

          <div className="m-auto grid w-full gap-4 text-center">
            <button
              type="submit"
              disabled={isPending}
              className="m-auto rounded-[20px] bg-blue-800 p-2 px-5 text-xl font-bold text-stone-100 disabled:bg-slate-700 sm:text-2xl md:text-[26px] lg:p-3 lg:px-6 lg:text-3xl lg:text-[28px]"
            >
              {formType === "signup" ? "Sign up" : "Log in"}
            </button>
            {formType === "signup" ? (
              <p className="text-sm md:text-base lg:text-xl xl:text-2xl">
                Already have an account?
                <Link to="/login" className="font-extrabold">
                  {" "}
                  Login
                </Link>
              </p>
            ) : (
              <p>
                Don't have an account?
                <Link to={"/signup"} className="font-extrabold">
                  {" "}
                  Sign up
                </Link>
              </p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

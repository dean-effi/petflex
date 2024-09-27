import { useState } from "react";
import { Link } from "react-router-dom";
import { UseMutateFunction } from "@tanstack/react-query";
import { QueryError, UserDetails } from "../types";

type UserFormProps = {
  onFormSubmit: UseMutateFunction<
    any,
    QueryError,
    UserDetails,
    unknown
  >;
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
    <main className="relative m-auto w-[300px] overflow-visible p-8 py-10 text-blue-800 sm:w-[400px] sm:text-xl lg:w-[455px] lg:text-xl">
      <section
        aria-label="header"
        className="header text-center font-extrabold"
      >
        <h1 className="grid">
          {formType === "signup" ? "Sign up to" : "Log in to"}
          <span className="text-4xl tracking-widest sm:text-5xl">
            {" "}
            petflex
          </span>
        </h1>
        <img
          className="m-auto mt-2 w-[125px] sm:w-[143px]"
          src="/logo.svg"
          alt="petflex logo"
        />
      </section>
      <section className="registeration mt-10">
        <form
          action=""
          onSubmit={e => {
            e.preventDefault();
            onFormSubmit(userDetails);
          }}
          className="mt-auto grid gap-5"
        >
          <label className="grid gap-3 font-bold sm:gap-4">
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
          <label className="grid gap-3 font-bold sm:gap-4">
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
          {errorMsg && (
            <p className="text-center font-bold text-red-800">
              {errorMsg}
            </p>
          )}

          <div className="m-auto grid w-full gap-4 text-center">
            <button
              type="submit"
              disabled={isPending}
              className="m-auto rounded-[20px] bg-blue-800 p-1.5 px-[14px] text-lg font-semibold text-stone-100 hover:bg-blue-950 active:bg-blue-600 disabled:bg-slate-700 sm:text-xl lg:text-2xl xl:mt-2 xl:p-2 xl:px-4"
            >
              {formType === "signup" ? "Sign up" : "Log in"}
            </button>
            {formType === "signup" ? (
              <p className="text-sm md:text-base lg:text-xl">
                Already have an account?
                <Link to="/login" className="font-bold">
                  {" "}
                  Login
                </Link>
              </p>
            ) : (
              <p>
                Don't have an account?
                <Link to={"/signup"} className="font-bold">
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

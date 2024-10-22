import { useRef, useState } from "react";
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
  const [clientError, setClientError] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const isFormValid = formRef.current?.checkValidity();
  console.log("isFormValid", isFormValid, formRef.current);
  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.validity.valid) {
      const errorMsg =
        e.target.name +
        (e.target.validity.tooShort
          ? " is too short"
          : " is too long");
      setClientError(errorMsg);
    } else {
      setClientError("");
    }
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <main className="relative m-auto w-[300px] overflow-visible p-8 py-10 text-violet-800 sm:w-[400px] sm:text-xl lg:w-[455px] lg:text-xl">
      <header className="header text-center font-extrabold">
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
      </header>
      <section className="registeration mt-8 lg:mt-10">
        <form
          ref={formRef}
          action=""
          onSubmit={e => {
            // console.log(e.target.checkValidity(), " is it valid");
            e.preventDefault();
            onFormSubmit(userDetails);
          }}
          className="mt-auto grid gap-5"
        >
          <label className="grid gap-3 font-bold sm:gap-4">
            Username:
            <input
              name="username"
              required={true}
              minLength={3}
              maxLength={20}
              onChange={onInputChange}
              value={userDetails.username}
              type="text"
              className="gray-bg rounded-md bg-stone-200 p-2 font-normal text-stone-800"
            />
          </label>
          <label className="grid gap-3 font-bold sm:gap-4">
            Password:
            <input
              name="password"
              required={true}
              minLength={5}
              maxLength={40}
              onChange={onInputChange}
              value={userDetails.password}
              type="password"
              className="gray-bg rounded-md bg-stone-200 p-2 font-normal text-stone-800"
            />
          </label>
          {(clientError || errorMsg) && (
            <p className="text-center font-bold text-red-800">
              {clientError || errorMsg}
            </p>
          )}

          <div className="m-auto grid w-full gap-4 text-center">
            <button
              type="submit"
              disabled={isPending || !isFormValid}
              className="normal-btn m-auto rounded-[20px] p-1.5 px-[14px] text-lg sm:text-xl lg:text-2xl xl:mt-2 xl:p-2 xl:px-4"
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

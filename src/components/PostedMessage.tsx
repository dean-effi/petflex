import { NavLink } from "react-router-dom";

export default function PostedMessage() {
  return (
    <main className="gray-bg m-auto mt-6 w-max max-w-full rounded-md p-4 px-3 text-left text-base leading-10 tracking-wider sm:text-lg md:p-6 lg:p-10 lg:text-3xl dark:bg-zinc-800">
      <p className="space-y-4 sm:space-y-5 lg:space-y-7">
        <div>Thank you for posting 🐶</div>
        <div>Your pet will be posted after admin approval.</div>
        <div>
          For now, go back
          <NavLink className={"text-violet-800 underline"} to={"/"}>
            {" home"}
          </NavLink>{" "}
        </div>
      </p>
    </main>
  );
}

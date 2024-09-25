import { NavLink } from "react-router-dom";

export default function ErrorPage({ status }: { status: number }) {
  const text =
    status == 401
      ? "Unauthorized"
      : status == 404
        ? "Not found"
        : "Unexpected error";
  return (
    <div className="p-6 text-3xl">
      <p>
        {text} go back{" "}
        <NavLink className={"underline"} to={"/"}>
          home
        </NavLink>{" "}
      </p>
    </div>
  );
}

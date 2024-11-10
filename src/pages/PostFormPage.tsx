import { useMutation } from "@tanstack/react-query";
import { FormEvent, useContext, useState } from "react";
import { PostSubmitionObject, QueryError } from "../types";
import { postPet } from "../fetchApi";
import { appContext } from "../appContext";
import ErrorPage from "./ErrorPage";
import PostForm from "../components/PostForm";
import { NavLink } from "react-router-dom";

export default function PostPetPage() {
  const { user, userLoading } = useContext(appContext).userQuery;
  const [posted, setPosted] = useState(false);
  const postMut = useMutation({
    mutationFn: (newPet: PostSubmitionObject) => postPet(newPet),
    onError: (err: QueryError) => err,
    onSuccess: () => setPosted(true),
  });

  function onFormSubmit(e: FormEvent, newPet: PostSubmitionObject) {
    e.preventDefault();
    postMut.mutate(newPet);
  }

  if (!user && !userLoading) {
    return <ErrorPage status={401} />;
  }
  if (posted) {
    return (
      <main className="gray-bg m-auto mt-6 w-max max-w-full rounded-md p-6 text-left text-base leading-10 tracking-wider sm:text-lg lg:p-10 lg:text-3xl dark:bg-zinc-800">
        <p>
          <div>Thank you for posting 🐶</div>
          <br />
          <div>Your pet will be posted after admin approval.</div>
          <br />
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
  return (
    <main>
      <PostForm
        formType="posting"
        mutation={postMut}
        submitPost={onFormSubmit}
      />
    </main>
  );
}

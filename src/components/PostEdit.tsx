import { useMutation } from "@tanstack/react-query";
import PostForm from "./PostForm";
import { PostSubmitionObject, PostType, QueryError } from "../types";
import { appContext } from "../appContext";
import { FormEvent, useContext } from "react";
import { queryClient } from "../main";
import { fetchApi } from "../fetchApi";
import ErrorPage from "../pages/ErrorPage";

export default function PostEdit({ post, cancelEdit }: any) {
  const { user, userLoading } = useContext(appContext).userQuery;

  const editMut = useMutation({
    mutationFn: (newPet: PostSubmitionObject) =>
      fetchApi<PostType>(
        "posts/" + post._id,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newPet),
        },
        true
      ),
    onError: (err: QueryError) => err,
    onSuccess: data => {
      queryClient.setQueryData(["posts", data.id], data);
      cancelEdit();
    },
  });

  function onFormSubmit(e: FormEvent, newPet: PostSubmitionObject) {
    e.preventDefault();
    editMut.mutate(newPet);
  }

  if (!user && !userLoading) {
    return <ErrorPage status={401} />;
  }
  return (
    <main className="mt-4 p-6">
      <button
        className="normal-btn rounded-lg p-1.5"
        onClick={cancelEdit}
      >
        Go back to post
      </button>
      <PostForm
        formType="editing"
        post={post}
        submitPost={onFormSubmit}
        mutation={editMut}
      />
    </main>
  );
}

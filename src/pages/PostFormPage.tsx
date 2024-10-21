import { useMutation } from "@tanstack/react-query";
import { FormEvent, useContext } from "react";
import { PostSubmitionObject, QueryError } from "../types";
import { postPet } from "../fetchApi";
import { appContext } from "../appContext";
import ErrorPage from "./ErrorPage";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";
import PostForm from "../components/PostForm";

export default function PostPetPage() {
  const navigate = useNavigate();
  const { user, userLoading } = useContext(appContext).userQuery;

  const postMut = useMutation({
    mutationFn: (newPet: PostSubmitionObject) => postPet(newPet),
    onError: (err: QueryError) => err,
    onSuccess: data => {
      queryClient.setQueryData(["posts", data.id], data);
      navigate("/" + data.id);
    },
  });

  function onFormSubmit(e: FormEvent, newPet: PostSubmitionObject) {
    e.preventDefault();
    postMut.mutate(newPet);
  }

  if (!user && !userLoading) {
    return <ErrorPage status={401} />;
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

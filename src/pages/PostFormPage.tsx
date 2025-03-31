import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { PostSubmitionObject, QueryError } from "../types";
import { postPet } from "../fetchApi";
import { appContext } from "../appContext";
import ErrorPage from "./ErrorPage";
import PostForm from "../components/PostForm";
import PostedMessage from "../components/PostedMessage";

export default function PostFormPage() {
  const { user, userLoading } = useContext(appContext).userQuery;
  const [posted, setPosted] = useState(false);
  const postMut = useMutation({
    mutationFn: (newPet: PostSubmitionObject) => postPet(newPet),
    onError: (err: QueryError) => err,
    onSuccess: () => setPosted(true),
  });

  if (!user && !userLoading) {
    return <ErrorPage status={401} />;
  }
  if (posted) {
    return <PostedMessage />;
  }
  return (
    <main>
      <PostForm formType="posting" mutation={postMut} />
    </main>
  );
}

import { useParams } from "react-router-dom";

import CommentsSection from "../components/comments/CommentsSection";
import PostDetails from "../components/PostDetails";
import ErrorPage from "./ErrorPage";
import { PostType, QueryError } from "../types";
import { fetchApi } from "../fetchApi";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../appContext";
import Spinner from "../assets/spinner.svg?react";
import PostEdit from "../components/PostEdit";

export default function PostPage() {
  const { postId } = useParams();
  const { user } = useContext(appContext).userQuery;
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data: post, ...postQuery } = useQuery<PostType, QueryError>(
    {
      queryKey: ["posts", postId],
      queryFn: () =>
        fetchApi(
          "posts/" + postId,
          {
            method: "GET",
          },
          false
        ),
    }
  );
  if (postQuery.isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <Spinner className="w-[32px] animate-spin text-violet-800 dark:text-stone-50" />
      </div>
    );
  }
  if (postQuery.isError) {
    return <ErrorPage status={postQuery.error.status} />;
  }
  if (post) {
    if (isEditing) {
      return (
        <PostEdit
          post={post}
          cancelEdit={() => setIsEditing(false)}
        />
      );
    }
    return (
      <div className="m-auto lg:w-[1000px] xl:w-[1200px]">
        <PostDetails
          edit={() => setIsEditing(true)}
          user={user}
          post={post}
        />
        <hr className="dark:border-zinc-700" />
        <CommentsSection user={user} postId={post._id} />
      </div>
    );
  }
}

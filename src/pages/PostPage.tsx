import { useParams } from "react-router-dom";

import CommentsSection from "../components/CommentsSection";
import PostDetails from "../components/PostDetails";
import ErrorPage from "./ErrorPage";
import { PostType, QueryError } from "../types";
import { fetchApi } from "../fetchApi";
import { useQuery } from "@tanstack/react-query";

export default function PostPage() {
  const { postId } = useParams();

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
    return <p>loading...</p>;
  }
  if (postQuery.isError) {
    return <ErrorPage status={postQuery.error.status} />;
  }
  console.log("rerendering post page");
  if (post) {
    return (
      <>
        <PostDetails post={post!} />
        <CommentsSection postId={postId!} />
      </>
    );
  }
}

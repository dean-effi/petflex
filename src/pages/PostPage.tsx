import { useParams } from "react-router-dom";

import CommentsSection from "../components/CommentsSection";
import PostDetails from "../components/PostDetails";
import ErrorPage from "./ErrorPage";
import { PostType, QueryError } from "../types";
import { fetchApi } from "../fetchApi";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { appContext } from "../appContext";
import Loading from "../components/Loading";

export default function PostPage() {
  const { postId } = useParams();
  const { user } = useContext(appContext).userQuery;
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
        <Loading width={32} />
      </div>
    );
  }
  if (postQuery.isError) {
    return <ErrorPage status={postQuery.error.status} />;
  }
  if (post) {
    return (
      <div className="m-auto lg:w-[1000px] xl:w-[1200px]">
        <PostDetails userId={user?._id} post={post} />
        <hr />
        <CommentsSection userId={user?._id} postId={post._id} />
      </div>
    );
  }
}

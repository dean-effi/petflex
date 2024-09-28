import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchApi } from "../fetchApi";
import { PostType, QueryError } from "../types";
import ErrorPage from "./ErrorPage";

export default function PostPage() {
  const { postId } = useParams();
  console.log("postidddd", postId);
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
  if (post) {
    return (
      <div className="p-6 text-xl">
        <h1 className="text-4xl">{post.name}</h1>
        <img src={post.image}></img>
        <p>{post.description}</p>
        <p>{post.age.years} years old!</p>
        <p>created by: {post.user.username}</p>
        at {new Date(post.createdAt).toLocaleDateString()}
        <br />
        he is a {post.petType}
        <br />
        and recieved {post.likesCount} likes!
      </div>
    );
  }
}

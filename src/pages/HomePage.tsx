import { ReactElement, useContext } from "react";
import { appContext } from "../appContext";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import { Link } from "react-router-dom";
import { PostType, QueryError } from "../types";

export default function HomePage() {
  const { data: posts, ...postsQuery } = useQuery<
    PostType[],
    QueryError
  >({
    queryKey: ["posts"],
    queryFn: () => fetchApi("posts", { method: "GET" }, false),
  });

  console.log(posts);
  const { user } = useContext(appContext).userQuery;
  console.log(user);
  let postsDisplay: ReactElement[] = [];
  if (posts) {
    postsDisplay = posts.map(post => {
      return (
        <Link to={post.id}>
          <article className="border-3 m-auto grid w-full justify-center gap-4 overflow-hidden border border-blue-700 p-4 text-center shadow-lg">
            <h2>{post.name}</h2>
            <img
              src={post.image}
              alt={post.name}
              className="m-auto h-[300px] w-[400px]"
            />
            <p>{post.description}</p>
            <hr className="border-blue-900" />
            <p className="">
              at:{new Date(post.createdAt).toLocaleString()}, by:
              {post.user.username}
            </p>
          </article>
        </Link>
      );
    });
  }
  if (postsQuery.isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div className="mt-4 text-center text-4xl">
        Welcome homeee, {user?.username || "stranger"}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 p-4 text-2xl">
        {postsDisplay}
      </div>
    </>
  );
}

import { ReactElement, useContext } from "react";
import { appContext } from "../appContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import { Link } from "react-router-dom";
import { PostType, QueryError } from "../types";
import { queryClient } from "../main";

export default function HomePage() {
  const postsQuery = useInfiniteQuery<PostType[], QueryError>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => {
      console.log("aaaaaa", pageParam);
      return fetchApi(
        `posts?page=${pageParam}`,
        { method: "GET" },
        false
      );
    },
    initialPageParam: 1,
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
      if (typeof lastPageParam === "number") {
        return lastPageParam + 1;
      } else {
        return 1;
      }
    },
  });

  function onLinkClick(id: string, post: PostType) {
    queryClient.setQueryData(["posts", id], post);
  }

  const { user } = useContext(appContext).userQuery;
  const pages = postsQuery.data?.pages;
  const postsDisplay: ReactElement[] = [];
  if (pages) {
    pages.forEach(page =>
      page.forEach(post => {
        postsDisplay.push(
          <Link
            onClick={() => onLinkClick(post.id, post)}
            to={post.id}
            key={post.id}
          >
            <article className="border-3 m-auto grid w-full justify-center gap-4 overflow-hidden border border-blue-700 p-4 text-center shadow-lg">
              <h2>{post.name}</h2>
              <img
                src={post.image}
                alt={post.name}
                className="m-auto h-[200px] w-[300px]"
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
      })
    );
  }
  if (postsQuery.isLoading) {
    return <div>loading...</div>;
  }

  console.log("data is here", postsQuery.data);
  return (
    <>
      <div className="mt-4 text-center text-4xl">
        Welcome homeee, {user?.username || "stranger"}
      </div>
      <div className="m-auto mt-4 grid w-[85%] grid-cols-4 gap-4 pb-2 text-lg">
        {postsDisplay}
      </div>
      <button
        onClick={() => postsQuery.fetchNextPage()}
        className="w-full border-2 border-black p-2 text-xl hover:bg-stone-200"
      >
        load more...
      </button>
    </>
  );
}

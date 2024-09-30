import { ReactElement, useContext } from "react";
import { appContext } from "../appContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import { PostType, QueryError } from "../types";
import PostPreview from "../components/PostPreview";

export default function HomePage() {
  const postsQuery = useInfiniteQuery<PostType[], QueryError>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => {
      return fetchApi(
        `posts?page=${pageParam}`,
        { method: "GET" },
        false
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.length < 2
        ? null
        : typeof lastPageParam === "number"
          ? lastPageParam + 1
          : 1;
    },
  });

  const { user } = useContext(appContext).userQuery;
  const pages = postsQuery.data?.pages;
  const postsDisplay: ReactElement[] = [];
  if (pages) {
    pages.forEach(page =>
      page.forEach(post => {
        postsDisplay.push(<PostPreview key={post.id} post={post} />);
      })
    );
  }

  // console.log("data is here", postsQuery.data);
  return (
    <>
      <div className="mt-4 text-center text-4xl">
        Welcome homeee, {user?.username || "stranger"}
      </div>
      <div className="m-auto mt-4 grid w-[85%] grid-cols-4 gap-4 pb-2 text-lg">
        {postsQuery.isLoading ? <h1>loading...</h1> : postsDisplay}
      </div>
      {postsQuery.hasNextPage && (
        <button
          onClick={() => postsQuery.fetchNextPage()}
          className="w-full border-2 border-black p-2 text-xl hover:bg-stone-200"
        >
          load more...
        </button>
      )}
    </>
  );
}

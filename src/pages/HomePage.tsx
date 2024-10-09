import { ReactElement } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import { PostType, QueryError } from "../types";
import PostPreview from "../components/PostPreview";
import { useSearchParams } from "react-router-dom";
import FiltersForm from "../components/FiltersForm";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: posts,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<PostType[], QueryError>({
    queryKey: ["posts", searchParams.toString()],
    // staleTime: 1000 * 60 * 10,
    queryFn: ({ pageParam }) => {
      // console.log(
      //   `posts?page=${pageParam}&${searchParams.toString()}`
      // );

      return fetchApi(
        `posts?page=${pageParam}&${searchParams.toString()}`,
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

  const pages = posts?.pages;

  const postsDisplay: ReactElement[] = [];

  pages?.forEach(page =>
    page.forEach(post => {
      postsDisplay.push(<PostPreview key={post.id} post={post} />);
    })
  );

  return (
    <>
      <FiltersForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="mt-4 text-center text-4xl">Welcome homeee</div>
      <div className="m-auto mt-4 grid w-[85%] grid-cols-3 gap-4 pb-2 text-lg">
        {isLoading ? <h1>loading...</h1> : postsDisplay}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="w-full border-2 border-black p-2 text-xl hover:bg-stone-200"
        >
          load more...
        </button>
      )}
    </>
  );
}

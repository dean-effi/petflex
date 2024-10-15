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
      if (typeof lastPageParam === "number") {
        return lastPageParam === 1 && lastPage.length < 4
          ? null
          : lastPage.length < 2
            ? null
            : lastPageParam + 1;
      }
      return 1;
    },
  });

  const pages = posts?.pages;

  const postsDisplay: ReactElement[] = [];

  pages?.forEach(page =>
    page.forEach(post => {
      postsDisplay.push(<PostPreview key={post.id} post={post} />);
    })
  );

  console.log("HOMEEEEEEEEEEEEEEEEEEEEEEEEE");

  return (
    <>
      <FiltersForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="mx-auto my-3 mt-4 grid grid-cols-[350px] justify-center gap-x-4 gap-y-9 pb-2 text-lg sm:grid-cols-[450px] lg:grid-cols-[450px,450px] 2xl:grid-cols-[450px_450px_450px] 2xl:space-x-5">
        {isLoading ? <h1>loading...</h1> : postsDisplay}
      </div>
      {hasNextPage && (
        <div className="grid justify-center">
          <button
            onClick={() => fetchNextPage()}
            className="my-6 rounded-lg border-2 border-violet-800 px-2 py-0.5 text-xl font-bold text-violet-800 hover:bg-violet-800 hover:text-stone-50 active:bg-violet-500"
          >
            load more...
          </button>
        </div>
      )}
    </>
  );
}

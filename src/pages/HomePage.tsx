import { ReactElement } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import { PostType, QueryError } from "../types";
import PostPreview from "../components/PostPreview";
import { useSearchParams } from "react-router-dom";
import FiltersForm from "../components/FiltersForm";
import Loading from "../components/Loading";
import LoadMoreBtn from "../components/LoadMoreBtn";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: posts,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PostType[], QueryError>({
    queryKey: ["posts", searchParams.toString()],
    // staleTime: 1000 * 60 * 10,
    queryFn: ({ pageParam }) => {
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

  return (
    <main>
      <section aria-label="filtering">
        <FiltersForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </section>
      <section aria-label="pets previews">
        {isLoading ? (
          <div className="w- mt-8 flex justify-center">
            <Loading width={32} />
          </div>
        ) : (
          <div className="mx-auto my-3 mt-4 grid grid-cols-[350px] justify-center gap-x-4 gap-y-9 pb-2 text-lg sm:grid-cols-[450px] lg:grid-cols-[450px_450px] 2xl:grid-cols-[450px_450px_450px]">
            {postsDisplay}
          </div>
        )}
        {hasNextPage && (
          <LoadMoreBtn
            {...{
              onBtnClick: () => fetchNextPage(),
              isFetchingNextPage,
            }}
          />
        )}
      </section>
    </main>
  );
}

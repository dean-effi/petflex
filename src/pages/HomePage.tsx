import { ReactElement, useContext } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import { PostType, QueryError } from "../types";
import PostPreview from "../components/PostPreview";
import { Link, useSearchParams } from "react-router-dom";
import FiltersForm from "../components/home-page/FiltersForm";
import Spinner from "../assets/spinner.svg?react";
import LoadMoreBtn from "../components/home-page/LoadMoreBtn";
import ErrorPage from "./ErrorPage";
import { appContext } from "../appContext";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { userLoading, user } = useContext(appContext).userQuery;
  const isLogged = Boolean(userLoading === false && user);
  const {
    data: posts,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery<PostType[], QueryError>({
    queryKey: ["posts", searchParams.toString()],
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
        return lastPageParam === 1 && lastPage.length < 9
          ? null
          : lastPage.length < 6
            ? null
            : lastPageParam + 1;
      }
      return null;
    },
  });

  const postsDisplay: ReactElement[] = [];

  posts?.pages.forEach(page =>
    page.forEach(post => {
      postsDisplay.push(<PostPreview key={post.id} post={post} />);
    })
  );
  if (isError) {
    return <ErrorPage status={error.status} />;
  }
  return (
    <main>
      <section aria-label="filtering">
        <FiltersForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </section>
      <section
        className="mt-4 lg:mt-5 xl:mt-6"
        aria-label="pets previews">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner className="w-[32px] animate-spin text-violet-800 dark:text-stone-50" />
          </div>
        ) : (
          <div className="mx-auto w-min">
            {!isLogged && (
              <p className="2x:text-[24px] pl-2 text-base font-medium text-violet-800 sm:text-lg md:mb-3 md:text-xl lg:mb-6 xl:text-[22px] dark:text-stone-50">
                <Link
                  to={"/login"}
                  className="font-bold text-violet-900 hover:text-violet-600 dark:text-violet-400 dark:hover:text-stone-300">
                  Log in
                </Link>{" "}
                or
                <Link
                  to={"/signup"}
                  className="font-bold text-violet-900 hover:text-violet-600 dark:text-violet-400 dark:hover:text-stone-300">
                  {" Sign up "}
                </Link>
                to like and comment
              </p>
            )}

            <div className="mx-auto grid grid-cols-[350px] justify-center gap-x-4 gap-y-9 pb-5 text-lg sm:grid-cols-[450px] lg:grid-cols-[450px_450px] 2xl:grid-cols-[450px_450px_450px] 2xl:gap-x-6">
              {postsDisplay}
            </div>
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

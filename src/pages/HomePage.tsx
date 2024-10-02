import { FormEvent, ReactElement, useContext, useState } from "react";
import { appContext } from "../appContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import { petsType, PostType, QueryError } from "../types";
import PostPreview from "../components/PostPreview";
import { useSearchParams } from "react-router-dom";

type QueryOptionsType = {
  order: "-1" | "1" | undefined;
  sortBy: string | undefined;
  petType: petsType | undefined;
};

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryOptions, setQueryOptions] = useState<QueryOptionsType>({
    order: undefined,
    sortBy: undefined,
    petType: undefined,
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    console.log("value", e.target.value);
    setQueryOptions({
      ...queryOptions,
      [e.target.name]: e.target.value,
    });

    return;
  }

  const postsQuery = useInfiniteQuery<PostType[], QueryError>({
    queryKey: ["posts", searchParams.toString()],
    staleTime: 1000 * 60 * 30,
    queryFn: ({ pageParam }) => {
      console.log(
        `posts?page=${pageParam}&${searchParams.toString()}`
      );
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

  const { user } = useContext(appContext).userQuery;
  const pages = postsQuery.data?.pages;

  function handleFiltersSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(queryOptions);
    const params: Record<string, string> = {};
    let param: keyof QueryOptionsType;
    for (param in queryOptions) {
      const assign = queryOptions[param];
      if (
        assign != undefined &&
        typeof assign == "string" &&
        !["-1", "all", "date"].includes(assign)
      ) {
        params[param] = assign;
      }
    }
    const search = new URLSearchParams(params);
    console.log(search);
    setSearchParams(params);
  }

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
      <form
        className="flex items-center gap-5 p-2 text-lg"
        onSubmit={handleFiltersSubmit}
      >
        filters:
        <br />
        <label>
          Sort By:
          <select
            name="sortBy"
            value={
              queryOptions.sortBy ||
              searchParams.get("sortBy") ||
              undefined
            }
            onChange={handleInputChange}
          >
            <option value="date">date</option>
            <option value="likes">likes</option>
          </select>
        </label>
        <label>
          Pet Type:
          <select
            name="petType"
            onChange={handleInputChange}
            value={
              queryOptions.petType ||
              searchParams.get("petType") ||
              undefined
            }
          >
            <option value="all">all</option>
            <option value="dog">dog</option>
            <option value="cat">cat</option>
            <option value="rabbit">rabbit</option>
            <option value="hamster">hamster</option>
            <option value="lizard">lizard</option>
            <option value="other">other</option>
          </select>
        </label>
        <label>
          Order:
          <select
            name="order"
            value={
              queryOptions.order ||
              searchParams.get("order") ||
              undefined
            }
            onChange={handleInputChange}
          >
            <option value={-1}>descending!!</option>
            <option value={1}>ascending!!!!!!!1</option>
          </select>
        </label>
        <button
          type="submit"
          className="rounded-md border border-blue-800 p-1"
        >
          Apply
        </button>
      </form>
      <div className="mt-4 text-center text-4xl">
        Welcome homeee, {user?.username || "stranger"}
      </div>
      <div className="m-auto mt-4 grid w-[85%] grid-cols-3 gap-4 pb-2 text-lg">
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

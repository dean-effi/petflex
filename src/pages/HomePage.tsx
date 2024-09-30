import { ReactElement, useContext, useRef } from "react";
import { appContext } from "../appContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import { petsType, PostType, QueryError } from "../types";
import PostPreview from "../components/PostPreview";

type QueryOptionsType = {
  order: number;
  sortBy: string;
  petType: petsType | "";
};

export default function HomePage() {
  const queryOptions = useRef<QueryOptionsType>({
    order: -1,
    sortBy: "date",
    petType: "",
  });

  console.log(queryOptions);
  function handleInputChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    console.log(e.target.name);
    queryOptions.current = {
      ...queryOptions.current,
      [e.target.name]: e.target.value,
    };
    postsQuery.refetch();
    return;
  }
  const postsQuery = useInfiniteQuery<PostType[], QueryError>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => {
      console.log();
      return fetchApi(
        `posts?page=${pageParam}&order=${queryOptions.current.order}&sortBy=${queryOptions.current.sortBy}&petType=${queryOptions.current.petType}`,
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
      {/* <button
        className="text-3xl"
        onClick={() => postsQuery.refetch()}
      >
        Refetch?
      </button> */}
      <div className="flex gap-5 p-2 text-lg">
        filters:
        <br />
        <label>
          Sort By:
          <select
            name="sortBy"
            value={queryOptions.current.sortBy}
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
            value={queryOptions.current.petType}
            onChange={handleInputChange}
          >
            <option value="">all</option>
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
            value={queryOptions.current.order}
            onChange={handleInputChange}
          >
            <option value={-1}>descending</option>
            <option value={1}>ascending</option>
          </select>
        </label>
      </div>
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

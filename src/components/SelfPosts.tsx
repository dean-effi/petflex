import { useQuery } from "@tanstack/react-query";
import { PostType, QueryError } from "../types";
import { fetchApi } from "../fetchApi";
import ErrorPage from "../pages/ErrorPage";
import Spinner from "../assets/spinner.svg?react";
import DeleteButton from "./DeleteButton";
import PostPreview from "./PostPreview";
import Bin from "../assets/bin.svg?react";

export default function SelfPosts() {
  const {
    data: posts,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery<PostType[], QueryError>({
    queryKey: ["posts", "self"],
    queryFn: () => fetchApi("posts/self", { method: "GET" }, true),
  });

  if (isError) {
    return <ErrorPage status={error.status} />;
  }

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner className="w-[32px] animate-spin text-violet-800 dark:text-stone-50" />
      </div>
    );

  return (
    <div className="space-y-12">
      {posts?.length === 0 ? (
        <p className="mt-4 text-center text-[30px] sm:text-4xl">
          No pets by you to display {":("}
        </p>
      ) : (
        posts?.map(post => {
          return (
            <div key={post._id}>
              <div className="mx-auto w-[350px] justify-center gap-x-4 gap-y-9 pb-5 text-lg sm:w-[450px]">
                <PostPreview post={post} inProfile={true} />
              </div>
              <div className="mx-auto w-min">
                <DeleteButton
                  onSuccess={() => refetch()}
                  id={post._id}>
                  <button
                    className="gray-bg flex aspect-square w-9 items-center justify-center rounded-[50%] shadow-sm transition-all hover:bg-red-400 active:bg-white sm:w-12 dark:bg-zinc-800 dark:hover:bg-red-700 active:dark:bg-zinc-400"
                    aria-label={`delete ${post.name}`}>
                    <Bin className="fill-neutral-950 sm:h-7 sm:w-7 dark:fill-stone-100"></Bin>
                  </button>
                </DeleteButton>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

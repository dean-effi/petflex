import { ReactElement, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import { PostType, QueryError } from "../types";
import PostPreview from "../components/home-page/PostPreview";
import Spinner from "../assets/spinner.svg?react";
import ErrorPage from "./ErrorPage";
import { appContext } from "../appContext";

export default function OnHold() {
  const { userQuery: user } = useContext(appContext);
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<PostType[], QueryError>({
    queryKey: ["posts", "private"],
    queryFn: () => {
      return fetchApi(`posts/private`, { method: "GET" }, true);
    },
  });

  const { mutate: accept } = useMutation({
    mutationFn: (id: string) =>
      fetchApi(`posts/${id}/public`, { method: "PUT" }, true),
    onSuccess: () => refetch(),
  });

  const { mutate: deny } = useMutation({
    mutationFn: (id: string) =>
      fetchApi(`posts/${id}`, { method: "DELETE" }, true),
    onSuccess: () => refetch(),
  });

  const postsDisplay: ReactElement[] = [];
  if ((!user.user && !user.userLoading) || !user.user?.admin) {
    return <ErrorPage status={401} />;
  }
  if (isError) {
    return <ErrorPage status={error.status} />;
  }
  posts?.forEach(post =>
    postsDisplay.push(
      <div
        key={post.id}
        className="border-2 border-black pb-20 dark:border-white">
        <PostPreview post={post} />
        <div className="mt-4 flex gap-12 text-2xl">
          <button
            className="ml-4 border border-green-500 p-2 font-bold text-green-500"
            onClick={() => accept(post.id)}>
            ACCEPT
          </button>

          <button
            onClick={() => deny(post.id)}
            className="ml-4 border border-red-500 p-2 font-bold text-red-500">
            DENY
          </button>
        </div>
      </div>
    )
  );

  return (
    <main>
      <section
        className="mt-4 lg:mt-5 xl:mt-6"
        aria-label="pets previews">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner className="w-[32px] animate-spin text-violet-800 dark:text-stone-50" />
          </div>
        ) : (
          <div className="mx-auto w-min">
            <div className="mx-auto grid grid-cols-[350px] justify-center gap-x-4 gap-y-9 pb-5 text-lg sm:grid-cols-[450px] lg:grid-cols-[450px_450px] 2xl:grid-cols-[450px_450px_450px] 2xl:gap-x-6">
              {postsDisplay}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

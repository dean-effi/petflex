import { useMutation, useQuery } from "@tanstack/react-query";
import { PostType, QueryError } from "../types";
import { fetchApi } from "../fetchApi";
import ErrorPage from "../pages/ErrorPage";
import Spinner from "../assets/spinner.svg?react";
import DeleteButton from "./DeleteButton";
import PostPreview from "./PostPreview";

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

  const { mutate: deletePost } = useMutation({
    mutationFn: (id: string) =>
      fetchApi(`posts/${id}`, { method: "DELETE" }, true),
    onSuccess: () => refetch(),
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
    <div className="space-y-6">
      {posts?.length === 0 ? (
        <p>No pets by you to display</p>
      ) : (
        posts?.map(post => {
          return (
            <div key={post._id} className="flex items-center gap-4">
              <div className="w-[500px]">
                <PostPreview post={post} inProfile={true} />
              </div>
              <DeleteButton deleteFn={() => deletePost(post._id)}>
                <button className="bg-red-700 px-1.5 py-0.5 text-3xl">
                  delete me
                </button>
                <br />
              </DeleteButton>
            </div>
          );
        })
      )}
    </div>
  );
}

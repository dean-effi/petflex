import { useQuery } from "@tanstack/react-query";
import { CommentType, QueryError } from "../types";
import { fetchApi } from "../fetchApi";

export default function useGetComments(postId: string) {
  const { data: comments, isLoading } = useQuery<
    CommentType[],
    QueryError
  >({
    queryKey: ["comments", postId],
    queryFn: () =>
      fetchApi(
        "comments/" + postId,
        {
          method: "GET",
        },
        false
      ),
    staleTime: 1000 * 60 * 20,
  });
  return { comments, isLoading };
}

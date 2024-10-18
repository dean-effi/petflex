import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { fetchApi } from "../fetchApi";
import { queryClient } from "../main";
import { CommentType } from "../types";

type PostCommentFormProps = {
  postId: string;
  parentId?: string | null;
  cancelReply?: () => void;
};

export default function PostCommentForm({
  postId,
  parentId = null,
  cancelReply,
}: PostCommentFormProps) {
  const [newComment, setNewComment] = useState("");
  const [clientError, setClientError] = useState("");

  const {
    mutate: postComment,
    isError,
    error,
  } = useMutation({
    mutationFn: (parentId: string | null = null) => {
      return fetchApi<CommentType[]>(
        "comments" + "/" + postId,
        {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            parentId: parentId,
            content: newComment,
          }),
        },
        true
      );
    },
    onSuccess: comments => {
      queryClient.setQueryData(["comments", postId], comments);
      setNewComment("");
      if (cancelReply) cancelReply();
    },
  });

  return (
    <form
      className="mt-2 md:mt-3 lg:mt-4"
      onSubmit={e => {
        e.preventDefault();
        if (newComment.length < 3 || newComment.length > 200) {
          setClientError(
            "message must contain between 3 and 200 characters"
          );
          return;
        }
        setClientError("");
        postComment(parentId);
      }}
    >
      <input
        type="text"
        name="content"
        minLength={3}
        maxLength={200}
        onChange={e => setNewComment(e.target.value)}
        value={newComment}
        className="mb-2 w-full break-all rounded-lg border-[2px] border-violet-800 pb-[4ch] pl-1 text-base lg:text-lg"
      />

      {(Boolean(clientError.length) || isError) && (
        <p className="text-semibold my-1 text-red-900">
          {clientError || error?.message}
        </p>
      )}

      <div className="space-x-1.5 lg:text-lg xl:text-[20px]">
        <button
          className="normal-btn rounded-lg px-1.5 py-0.5"
          type="submit"
        >
          Submit
        </button>

        {cancelReply && (
          <button
            className="rounded-lg border-2 border-stone-800 px-1.5 text-stone-800 hover:border-stone-700 hover:text-stone-700 active:bg-stone-400"
            onClick={cancelReply}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

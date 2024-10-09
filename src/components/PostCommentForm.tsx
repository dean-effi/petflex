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
      className="m-2"
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
        className="mb-2 flex items-start border-2 border-blue-700 p-2 pb-8 pl-1"
      />

      {(Boolean(clientError.length) || isError) && (
        <p className="m-1 my-2 text-red-900">
          {clientError || error?.message}
        </p>
      )}

      <div className="space-x-4">
        <button
          className="rounded-md border-2 border-blue-600 p-1"
          type="submit"
        >
          Submit
        </button>

        {cancelReply && (
          <button
            className="rounded-md border-2 border-blue-600 p-1"
            onClick={cancelReply}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

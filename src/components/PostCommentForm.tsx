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
  const commentMut = useMutation({
    mutationFn: (parentId: string | null = null) => {
      return fetchApi(
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
    onSuccess: (comments: CommentType) => {
      queryClient.setQueryData(["comments", postId], comments);
      setNewComment("");
      if (cancelReply) cancelReply();
    },
  });
  function postComment(e: React.FormEvent) {
    e.preventDefault();
    commentMut.mutate(parentId);
  }
  return (
    <form className="m-2" onSubmit={postComment}>
      <input
        type="text"
        name="content"
        onChange={e => setNewComment(e.target.value)}
        value={newComment}
        className="mb-2 flex items-start border-2 border-blue-700 p-2 pb-8 pl-1"
      />
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

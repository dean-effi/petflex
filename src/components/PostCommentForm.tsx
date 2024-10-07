import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { fetchApi } from "../fetchApi";
import { queryClient } from "../main";
import { CommentType } from "../types";

export default function PostCommentForm({
  postId,
  parentId = null,
}: {
  postId: string;
  parentId?: string | null;
}) {
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
    },
  });
  function postComment(e: React.FormEvent) {
    e.preventDefault();
    commentMut.mutate(parentId);
  }
  return (
    <form className="m-2" onSubmit={postComment}>
      <textarea
        name="content"
        onChange={e => setNewComment(e.target.value)}
        value={newComment}
        className="border-2 border-blue-700"
      ></textarea>
      <button>Submit</button>
    </form>
  );
}

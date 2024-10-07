import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { fetchApi } from "../fetchApi";
import { queryClient } from "../main";
import { CommentType } from "../types";

export default function PostCommentForm({
  postId,
}: {
  postId: string;
}) {
  const [newComment, setNewComment] = useState({
    content: "",
  });
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
            content: newComment.content,
          }),
        },
        true
      );
    },
    onSuccess: (comments: CommentType) => {
      queryClient.setQueryData(["comments", postId], comments);
    },
  });
  function postComment(e: React.FormEvent) {
    e.preventDefault();
    commentMut.mutate(null);
  }
  return (
    <form onSubmit={postComment}>
      <textarea
        name="content"
        onChange={e =>
          setNewComment({
            ...newComment,
            content: e.target.value,
          })
        }
        value={newComment.content}
        className="border-2 border-blue-700"
      ></textarea>
      <button>Submit</button>
    </form>
  );
}

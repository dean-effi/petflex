import { useState } from "react";
import { CommentType } from "../types";
import PostCommentForm from "./PostCommentForm";
import { fetchApi } from "../fetchApi";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

type CommentProps = {
  comment: CommentType;
  replyComments: CommentType[];
  postId: string;
  userId: string | undefined;
};
export default function Comment({
  comment,
  replyComments,
  postId,
  userId,
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const { mutate: deleteComment } = useMutation({
    mutationFn: () => {
      return fetchApi(
        "comments" + "/" + postId + "/" + comment._id,
        {
          method: "DELETE",
        },
        true
      );
    },
    onSuccess: (comments: CommentType) => {
      queryClient.setQueryData(["comments", postId], comments);
    },
  });
  const replies = replyComments.filter(
    reply => reply.parentId === comment._id
  );
  return (
    <>
      <div className="m-2 mt-0 border-l-2 border-stone-500">
        <div className="w-full border border-blue-700 p-2 text-xl shadow-lg">
          <p>{comment.content}</p>
          <p>by: {comment.user.username}</p>
          <p className="text-base">
            at: {new Date(comment.createdAt).toLocaleString()}
          </p>

          <button onClick={() => setIsReplying(true)}>Reply</button>
          {comment.user._id === userId && (
            <button
              onClick={() => deleteComment()}
              className="ml-2 text-red-800"
            >
              Delete
            </button>
          )}
        </div>

        {isReplying && (
          <>
            <PostCommentForm
              postId={postId!}
              parentId={comment._id}
              cancelReply={() => setIsReplying(false)}
            />
          </>
        )}
        {replies.map(reply => {
          return (
            <div key={comment._id} className="ml-6 mt-1">
              <Comment
                comment={reply}
                replyComments={replyComments}
                postId={postId}
                userId={userId}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

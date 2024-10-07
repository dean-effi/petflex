import { useState } from "react";
import { CommentType } from "../types";
import PostCommentForm from "./PostCommentForm";

type CommentProps = {
  comment: CommentType;
  replyComments: CommentType[];
  postId: string;
};
export default function Comment({
  comment,
  replyComments,
  postId,
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
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
        </div>
        {isReplying && (
          <>
            <PostCommentForm
              postId={postId!}
              parentId={comment._id}
            />
            <button onClick={() => setIsReplying(false)}>
              Cancel
            </button>
          </>
        )}
        {replies.map(reply => {
          return (
            <div key={comment._id} className="ml-6 mt-1">
              <Comment
                comment={reply}
                replyComments={replyComments}
                postId={postId}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

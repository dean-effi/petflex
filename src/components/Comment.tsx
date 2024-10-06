import { CommentType } from "../types";

type CommentProps = {
  comment: CommentType;
  replyComments: CommentType[];
};
export default function Comment({
  comment,
  replyComments,
}: CommentProps) {
  const replies = replyComments.filter(
    reply => reply.parentId === comment._id
  );
  console.log("replies", replies);
  return (
    <>
      <div className="m-2 mt-0 border-l-2 border-stone-500">
        <div className="w-full border border-blue-700 p-2 text-xl shadow-lg">
          <p>{comment.content}</p>
          <p>by: {comment.user.username}</p>
          <p className="text-base">
            at: {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
        {replies.map(reply => {
          return (
            <div key={comment._id} className="ml-6 mt-1">
              <Comment
                comment={reply}
                replyComments={replyComments}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

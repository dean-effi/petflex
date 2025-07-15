import Comment from "../components/comments/Comment";
import { CommentType, User } from "../types";

export default function sortComments(
  comments: CommentType[],
  user: User | undefined
) {
  const topLevelComments: CommentType[] = [];
  const replyComments: CommentType[] = [];

  comments.forEach(comment => {
    if (comment.parentId == null) {
      topLevelComments.push(comment);
    } else {
      replyComments.push(comment);
    }
  });

  replyComments.sort(
    (a, b) =>
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
  );
  return topLevelComments.map(comment => {
    return (
      <Comment
        key={comment._id}
        replyComments={replyComments}
        comment={comment}
        postId={comment.postId}
        user={user}
      />
    );
  });
}

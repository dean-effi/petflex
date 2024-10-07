import { ReactElement } from "react";
import PostCommentForm from "./PostCommentForm";
import { CommentType, QueryError } from "../types";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import Comment from "./Comment";

export default function CommentsSection({
  postId,
  userId,
}: {
  postId: string;
  userId: string | undefined;
}) {
  const { data: comments } = useQuery<CommentType[], QueryError>({
    queryKey: ["comments", postId],
    queryFn: () =>
      fetchApi(
        "comments/" + postId,
        {
          method: "GET",
        },
        false
      ),
  });
  let commentsElements: ReactElement<any>[] = [];
  if (comments) {
    const topLevelComments: CommentType[] = [];
    const replyComments: CommentType[] = [];

    comments.forEach(comment => {
      if (comment.parentId == null) {
        topLevelComments.push(comment);
      } else {
        replyComments.push(comment);
      }
    });
    commentsElements = topLevelComments.map(comment => {
      return (
        <Comment
          key={comment._id}
          replyComments={replyComments}
          comment={comment}
          postId={postId}
          userId={userId}
        />
      );
    });
  }

  return (
    <section className="mt-20 text-lg">
      <h1 className="text-5xl">Comments:</h1>
      {commentsElements}

      <PostCommentForm postId={postId!} />
    </section>
  );
}

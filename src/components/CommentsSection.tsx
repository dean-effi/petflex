import { ReactElement } from "react";
import PostCommentForm from "./PostCommentForm";
import { CommentType, QueryError } from "../types";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import Comment from "./Comment";
import Loading from "./Loading";

export default function CommentsSection({
  postId,
  userId,
}: {
  postId: string;
  userId: string | undefined;
}) {
  console.log("re-rendering comments");
  const { data: comments, isLoading } = useQuery<
    CommentType[],
    QueryError
  >({
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
  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <Loading width={32} />
      </div>
    );
  }
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

    replyComments.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
    );
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
    <section className="p-4 pt-6 lg:px-0" aria-label="comments">
      {!userId && (
        <h2 className="2x:text-[24px] mb-2 text-base font-bold text-violet-800 sm:text-lg md:mb-3 md:text-xl lg:mb-4 xl:text-[22px]">
          log in to comment
        </h2>
      )}
      <PostCommentForm postId={postId!} />
      {commentsElements}
    </section>
  );
}

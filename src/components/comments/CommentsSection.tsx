import { ReactElement } from "react";
import PostCommentForm from "./PostCommentForm";
import { CommentType, QueryError, User } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../../fetchApi";
import Comment from "./Comment";
import Loading from "../Spinner";
import { Link } from "react-router-dom";

export default function CommentsSection({
  postId,
  user,
}: {
  postId: string;
  user: User | undefined;
}) {
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
    staleTime: 1000 * 60 * 20,
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
          user={user}
        />
      );
    });
  }

  return (
    <section className="p-4 pt-6 lg:px-0" aria-label="comments">
      {!user && (
        <h2 className="2x:text-[24px] mb-2 text-base font-medium text-violet-800 sm:text-lg md:mb-3 md:text-xl lg:mb-4 xl:text-[22px]">
          <Link
            to={"/login"}
            className="font-bold text-violet-900 hover:text-violet-600">
            Log in
          </Link>{" "}
          to comment
        </h2>
      )}
      <PostCommentForm postId={postId!} />
      {commentsElements}
    </section>
  );
}

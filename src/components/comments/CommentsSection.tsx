import { ReactElement } from "react";
import PostCommentForm from "./PostCommentForm";
import { User } from "../../types";
import Spinner from "../../assets/spinner.svg?react";
import { Link } from "react-router-dom";
import useGetComments from "../../customHooks/useGetComments";
import sortComments from "../../utility/sortComments";

export default function CommentsSection({
  postId,
  user,
}: {
  postId: string;
  user: User | undefined;
}) {
  const { comments, isLoading } = useGetComments(postId);

  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <Spinner className="w-[32px] animate-spin text-violet-800 dark:text-stone-50" />
      </div>
    );
  }
  const commentsElements: ReactElement<any>[] | [] = comments?.length
    ? sortComments(comments, user)
    : [];

  return (
    <section className="p-4 pt-6 lg:px-0" aria-label="comments">
      {!user && (
        <h2 className="2x:text-[24px] mb-2 text-base font-medium text-violet-800 sm:text-lg md:mb-3 md:text-xl lg:mb-4 xl:text-[22px] dark:text-violet-400">
          <Link
            to={"/login"}
            className="font-bold text-violet-900 hover:text-violet-600 dark:text-violet-300 dark:hover:text-violet-200">
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

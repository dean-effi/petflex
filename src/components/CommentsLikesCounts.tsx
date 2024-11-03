import LikeButton from "./LikeButton";
import Comment from "../assets/comment.svg?react";
type CommentsLikesCountsPromps = {
  postId: string;
  liked: boolean;
  initialLikes: number;
  isUserLogged: boolean;
  commentsCount: number;
  inPage?: boolean;
};

export default function CommentsLikesCounts({
  postId,
  liked,
  initialLikes,
  isUserLogged,
  commentsCount,
  inPage = false,
}: CommentsLikesCountsPromps) {
  return (
    <div
      className={`flex items-center font-medium text-violet-800 lg:pt-0.5 dark:text-stone-50 ${
        inPage ? "gap-5 lg:text-2xl" : "gap-4 lg:text-xl"
      } `}>
      <LikeButton
        {...{ postId, liked, initialLikes, isUserLogged, inPage }}
        inPage={inPage}
      />
      <div className="flex items-center gap-2">
        {commentsCount}
        <Comment
          className={inPage ? "lg:h-[22px] lg:w-[22px]" : ""}
        />
      </div>
    </div>
  );
}

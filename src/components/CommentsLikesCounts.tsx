import LikeButton from "./LikeButton";
import CommentIcon from "../assets/CommentIcon.tsx";

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
      className={
        "flex items-center gap-4 text-lg text-violet-800 lg:pt-0.5 lg:text-xl dark:text-stone-50 " +
        (inPage ? " lg:font-medium" : "")
      }>
      <LikeButton
        {...{ postId, liked, initialLikes, isUserLogged }}
        inPage={inPage}
      />
      <div className="flex items-center gap-2">
        {commentsCount}

        <CommentIcon inPage={inPage} />
      </div>
    </div>
  );
}

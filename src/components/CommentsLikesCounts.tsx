import LikeButton from "./LikeButton";
import commentIcon from "../assets/comment.svg";

type CommentsLikesCountsPromps = {
  postId: string;
  liked: boolean;
  initialLikes: number;
  isUserLogged: boolean;
  commentsCount: number;
};

export default function CommentsLikesCounts({
  postId,
  liked,
  initialLikes,
  isUserLogged,
  commentsCount,
}: CommentsLikesCountsPromps) {
  return (
    <div className="mt-1 flex gap-4 text-xl text-violet-800">
      <LikeButton
        {...{ postId, liked, initialLikes, isUserLogged }}
      />
      <div className="flex items-center gap-2">
        {commentsCount}
        <img className="w-5" src={commentIcon} alt="" />
      </div>
    </div>
  );
}

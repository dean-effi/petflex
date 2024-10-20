import LikeButton from "./LikeButton";
import commentIcon from "../assets/comment.svg";

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
        "flex items-center gap-4 text-lg text-violet-800 lg:pt-0.5 lg:text-xl " +
        (inPage ? " lg:font-medium" : "")
      }
    >
      <LikeButton
        {...{ postId, liked, initialLikes, isUserLogged }}
        inPage={inPage}
      />
      <div className="flex items-center gap-2">
        {commentsCount}
        <img
          className={"w-5 " + (inPage ? "lg:w-6" : "")}
          src={commentIcon}
          alt=""
        />
      </div>
    </div>
  );
}

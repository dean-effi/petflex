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
        "mt-1 flex gap-4 text-xl text-violet-800 " +
        (inPage ? " lg:font-semibold" : "")
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

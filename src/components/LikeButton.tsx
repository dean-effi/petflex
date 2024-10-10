/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchApi } from "../fetchApi";
import heart from "../assets/heart.svg";
import heartFilled from "../assets/heart-filled.svg";

type LikeButtonProps = {
  postId: string;
  liked: boolean;
  initialLikes: number;
  isUserLogged: boolean;
};

export default function LikeButton({
  postId,
  liked,
  initialLikes,
  isUserLogged,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const { mutate: sendLike } = useMutation({
    mutationFn: () =>
      fetchApi(
        "posts/" + postId + "/likes",
        { method: "Post" },
        true
      ),
  });

  useEffect(() => {
    setIsLiked(liked);
    setLikesCount(initialLikes);
  }, [initialLikes, liked, isUserLogged]);

  function likePost(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (!isUserLogged) return;
    isLiked
      ? setLikesCount(likesCount => likesCount - 1)
      : setLikesCount(likesCount => likesCount + 1);

    setIsLiked(!isLiked);
    sendLike();
  }

  return (
    <div className="flex items-center gap-1 text-xl">
      {likesCount}
      <button
        aria-label="like"
        className=""
        onClick={e => likePost(e)}
      >
        <img alt="" src={isLiked ? heartFilled : heart} />
      </button>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchApi } from "../fetchApi";
import HeartIcon from "../assets/heart.svg?react";
import HeartIconFilled from "../assets/heart-filled.svg?react";

type LikeButtonProps = {
  postId: string;
  liked: boolean;
  initialLikes: number;
  isUserLogged: boolean;
  inPage?: boolean;
};

export default function LikeButton({
  postId,
  liked,
  initialLikes,
  isUserLogged,
  inPage = false,
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
    <div className="flex items-center gap-2">
      {likesCount}
      <button
        aria-label="like post"
        className=""
        onClick={e => likePost(e)}>
        {isLiked ? (
          <HeartIconFilled
            className={inPage ? "lg:h-[22px] lg:w-[22px]" : ""}
          />
        ) : (
          <HeartIcon
            className={inPage ? "lg:h-[22px] lg:w-[22px]" : ""}
          />
        )}
      </button>
    </div>
  );
}

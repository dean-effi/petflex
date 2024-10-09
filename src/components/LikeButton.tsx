import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchApi } from "../fetchApi";
import heart from "../assets/heart.svg";
import heartFilled from "../assets/heart-filled.svg";

export default function LikeButton({
  postId,
  liked,
  initialLikes,
}: {
  postId: string;
  liked: boolean;
  initialLikes: number;
}) {
  const [isLiked, setIsLiked] = useState(liked);
  const [likesCount, setlikesCount] = useState(initialLikes);
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
    setlikesCount(initialLikes);
  }, [initialLikes, liked]);
  function likePost(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (isLiked) {
      console.log("unliked", postId);
      setlikesCount(likesCount => likesCount - 1);
    } else {
      setlikesCount(likesCount => likesCount + 1);

      console.log("liked", postId);
    }
    sendLike();
    setIsLiked(!isLiked);
  }

  console.log("rendering like", initialLikes);

  return (
    <div className="flex items-center gap-1 text-xl">
      {likesCount}
      <button className="" onClick={e => likePost(e)}>
        <img src={isLiked ? heartFilled : heart} alt="" />
      </button>
    </div>
  );
}

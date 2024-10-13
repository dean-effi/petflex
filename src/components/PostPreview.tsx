import { Link } from "react-router-dom";
import { PostType } from "../types";
import { queryClient } from "../main";
import LikeButton from "./LikeButton";
import commentIcon from "../assets/comment.svg";
import { appContext } from "../appContext";
import { useContext } from "react";

export default function PostPreview({ post }: { post: PostType }) {
  const { user } = useContext(appContext).userQuery;

  function onLinkClick(post: PostType) {
    queryClient.setQueryData(["posts", post.id], post);
  }
  return (
    <Link onClick={() => onLinkClick(post)} to={post.id}>
      <article className="border-3 shadow-3xl bg-card-gray m-auto grid h-full max-w-[400px] auto-rows-max justify-center gap-4 overflow-hidden rounded-xl border p-4 shadow-lg shadow-stone-200 hover:bg-stone-200">
        <div className="flex justify-between px-2 text-xl font-semibold">
          <div>
            <h2 className="text-violet-800">{post.name}</h2>
            <p className="text-sm">
              posted by
              <span className="text-violet-800">
                {" " + post.user.username}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <LikeButton
              liked={
                user?._id ? post.likes.includes(user?._id) : false
              }
              postId={post._id}
              isUserLogged={!!user?._id}
              initialLikes={post.likesCount}
            />
            <div className="flex items-center gap-1">
              {post.commentsCount}
              <img className="w-6" src={commentIcon} alt="" />
            </div>
          </div>
        </div>
        <img
          src={post.image}
          alt={post.name}
          className="m-auto h-[220px] w-[400px]"
        />
        <p>{post.description}</p>
        <p className="h-content text-sm md:text-base">
          {post.gender} | {post.age.years + "yo"} |
          {" created at " +
            new Date(post.createdAt).toLocaleDateString()}{" "}
        </p>
      </article>
    </Link>
  );
}

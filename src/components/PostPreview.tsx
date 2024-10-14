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
      <article className="preview-card border-3 gray-bg m-auto grid h-full grid-rows-[max-content_max-content_max-content_1fr] justify-center gap-3 overflow-hidden rounded-xl border p-4 shadow-lg hover:bg-stone-200">
        <div className="flex items-start justify-between text-xl font-semibold">
          <div>
            <h2 className="text-2xl text-violet-800">{post.name}</h2>
            <p className="text-sm font-medium">
              posted by
              <span className="text-violet-800">
                {" " + post.user.username}
              </span>
            </p>
          </div>
          <div className="flex gap-4 pt-0.5 text-xl text-violet-800">
            <LikeButton
              liked={
                user?._id ? post.likes.includes(user?._id) : false
              }
              postId={post._id}
              isUserLogged={!!user?._id}
              initialLikes={post.likesCount}
            />
            <div className="flex items-center gap-2">
              {post.commentsCount}
              <img className="w-5" src={commentIcon} alt="" />
            </div>
          </div>
        </div>
        <img
          src={post.image}
          alt={post.name}
          className="m-auto h-[240px] w-[400px] rounded-sm"
        />
        <p className="line-clamp-2 font-medium">{post.description}</p>
        <div className="self-end">
          <p className="h-content text-sm font-light md:text-base">
            {post.gender} | {post.age.years + "yo"} |
            {" created at " +
              new Date(post.createdAt).toLocaleDateString()}{" "}
          </p>
        </div>
      </article>
    </Link>
  );
}

import { Link } from "react-router-dom";
import { PostType } from "../types";
import { queryClient } from "../main";
import LikeButton from "./LikeButton";
import { appContext } from "../appContext";
import { useContext } from "react";

export default function PostPreview({ post }: { post: PostType }) {
  const { user } = useContext(appContext).userQuery;

  function onLinkClick(post: PostType) {
    queryClient.setQueryData(["posts", post.id], post);
  }
  return (
    <Link onClick={() => onLinkClick(post)} to={post.id}>
      <article className="border-3 m-auto grid h-full max-w-[400px] auto-rows-max justify-center gap-4 overflow-hidden rounded-lg border p-4 text-center shadow-[3px_3px_3px_#bfdbfe] hover:bg-stone-200">
        <div className="flex justify-between px-2 text-xl font-semibold">
          <h2>{post.name}</h2>
          <LikeButton
            liked={user?._id ? post.likes.includes(user?._id) : false}
            postId={post._id}
            isUserLogged={!!user?._id}
            initialLikes={post.likesCount}
          />
        </div>
        <img
          src={post.image}
          alt={post.name}
          className="m-auto h-[200px] w-[300px]"
        />
        <p>{post.description}</p>
        <hr className="border-blue-900" />
        <p className="">
          at:{new Date(post.createdAt).toLocaleString()}, by:
          {post.user.username} | he is a {post.petType} | likes:{" "}
          {post.likesCount}
        </p>
      </article>
    </Link>
  );
}

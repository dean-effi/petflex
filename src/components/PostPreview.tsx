import { Link } from "react-router-dom";
import { PostType } from "../types";
import { queryClient } from "../main";

import { appContext } from "../appContext";
import { useContext } from "react";
import PostBottomLine from "./PostBottomLine";
import CommentsLikesCounts from "./CommentsLikesCounts";

export default function PostPreview({ post }: { post: PostType }) {
  const { user } = useContext(appContext).userQuery;

  function onLinkClick(post: PostType) {
    queryClient.setQueryData(["posts", post.id], post);
  }
  return (
    <Link
      onClick={() => onLinkClick(post)}
      to={post.id}
      aria-label={"read more about " + post.name}
    >
      <article className="preview-card border-3 gray-bg grid h-full w-full grid-rows-[max-content_max-content_max-content_1fr] justify-center gap-3 rounded-xl px-4 py-2 shadow-lg hover:bg-[#eae9e8]">
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
          <CommentsLikesCounts
            commentsCount={post.commentsCount}
            liked={user?._id ? post.likes.includes(user?._id) : false}
            postId={post._id}
            isUserLogged={!!user?._id}
            initialLikes={post.likesCount}
          />
        </div>

        <div className="h-[250px] w-[320px] rounded-sm bg-slate-200 sm:w-[400px]">
          <img
            className="h-full w-full object-cover object-center"
            src={post.image}
            alt={post.name}
          />
        </div>
        <p className="line-clamp-2 font-medium">{post.description}</p>

        {/* bottom details */}
        <PostBottomLine post={post} />
      </article>
    </Link>
  );
}

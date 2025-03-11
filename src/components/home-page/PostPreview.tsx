import { Link } from "react-router-dom";
import { PostType } from "../../types";
import { queryClient } from "../../main";

import { appContext } from "../../appContext";
import { useContext } from "react";
import PostBottomLine from "../PostBottomLine";
import CommentsLikesCounts from "../CommentsLikesCounts";

export default function PostPreview({ post }: { post: PostType }) {
  const { user } = useContext(appContext).userQuery;

  function onLinkClick(post: PostType) {
    queryClient.setQueryData(["posts", post.id], post);
  }
  return (
    <Link
      onClick={() => onLinkClick(post)}
      to={"/" + post.id}
      aria-label={"read more about " + post.name}>
      <article className="preview-card gray-bg grid h-full w-full grid-rows-[max-content_max-content_5ch_1fr] justify-center gap-3 overflow-hidden rounded-xl px-4 py-2 shadow-lg hover:bg-[#eae9e8] sm:py-3 dark:bg-zinc-800 dark:shadow-[#141419] dark:hover:bg-[#29292d]">
        <div className="flex items-start justify-between text-xl">
          <div>
            <div className="text-1xl max-w-[17ch] overflow-hidden sm:max-w-[20ch]">
              <h2 className="font-semibold text-violet-800 md:text-2xl dark:font-bold dark:text-violet-400">
                {post.name}
              </h2>
            </div>
            <p className="text-sm font-medium">
              posted by
              <span className="font-semibold text-violet-800 dark:text-violet-400">
                {" " + (post.user?.username || "unknown")}
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

        <img
          className="h-[250px] w-[320px] rounded-[3px] bg-slate-200 object-cover object-center sm:w-[400px]"
          src={post.image}
          alt={post.name}
        />
        <p className="line-clamp-2 font-medium">{post.description}</p>

        {/* bottom details */}
        <PostBottomLine post={post} />
      </article>
    </Link>
  );
}

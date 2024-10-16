import { Link } from "react-router-dom";
import { PostType } from "../types";
import { queryClient } from "../main";
import LikeButton from "./LikeBtn";
import commentIcon from "../assets/comment.svg";
import maleIcon from "../assets/male.svg";
import femaleIcon from "../assets/female.svg";
import questionIcon from "../assets/question.svg";

import { appContext } from "../appContext";
import { useContext } from "react";

export default function PostPreview({ post }: { post: PostType }) {
  const { user } = useContext(appContext).userQuery;

  function onLinkClick(post: PostType) {
    queryClient.setQueryData(["posts", post.id], post);
  }
  return (
    <Link onClick={() => onLinkClick(post)} to={post.id}>
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
          <div className="mt-1 flex gap-4 text-xl text-violet-800">
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

        <div className="h-[250px] w-[320px] rounded-sm bg-slate-200 sm:w-[400px]">
          <img
            className="h-full w-full object-cover object-center"
            src={post.image}
            alt={post.name}
          />
        </div>
        <p className="line-clamp-2 font-medium">{post.description}</p>

        {/* bottom details */}
        <div className="self-end">
          <p className="h-content flex items-center gap-0.5 text-sm font-light md:text-base">
            {
              <img
                src={
                  post.gender == "male"
                    ? maleIcon
                    : post.gender === "female"
                      ? femaleIcon
                      : questionIcon
                }
                className="inline"
                alt={post.gender}
              />
            }
            | {post.age.years + "yo"} |
            {" created at " +
              new Date(post.createdAt).toLocaleDateString()}{" "}
          </p>
        </div>
      </article>
    </Link>
  );
}

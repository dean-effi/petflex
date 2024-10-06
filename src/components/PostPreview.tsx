import { Link } from "react-router-dom";
import { PostType } from "../types";
import { queryClient } from "../main";

export default function PostPreview({ post }: { post: PostType }) {
  function onLinkClick(post: PostType) {
    queryClient.setQueryData(["posts", post.id], post);
  }
  return (
    <Link onClick={() => onLinkClick(post)} to={post.id}>
      <article className="border-3 m-auto grid h-full w-full auto-rows-max justify-center gap-4 overflow-hidden rounded-lg border p-4 text-center shadow-[3px_3px_3px_#bfdbfe] hover:bg-stone-200">
        <h2>{post.name}</h2>
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

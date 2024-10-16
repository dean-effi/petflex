import { PostType } from "../types";
import CommentsLikesCounts from "./CommentsLikesCounts";
import DeleteButton from "./DeleteButton";
import PostBottomLine from "./PostBottomLine";
export default function PostDetails({
  post,
  userId,
}: {
  post: PostType;
  userId: string | undefined;
}) {
  return (
    <section className="p-6 text-xl">
      <h1 className="text-4xl">{post.name}</h1>
      <img className="max-h-[70vh]" src={post.image}></img>
      <div className="flex gap-40">
        <CommentsLikesCounts
          commentsCount={post.commentsCount}
          initialLikes={post.likesCount}
          liked={userId ? post.likes.includes(userId) : false}
          isUserLogged={!!userId}
          postId={post._id}
        />
        {post.user._id === userId && (
          <div>
            <DeleteButton postId={post._id} />{" "}
            <button className="rounded-xl border border-stone-500 p-1 text-lg">
              Edit
            </button>
          </div>
        )}
      </div>

      <p>{post.description}</p>
      <PostBottomLine post={post} />
    </section>
  );
}

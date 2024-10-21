import { PostType } from "../types";
import CommentsLikesCounts from "./CommentsLikesCounts";
import DeleteButton from "./DeleteButton";
import PostBottomLine from "./PostBottomLine";
export default function PostDetails({
  post,
  userId,
  edit,
}: {
  post: PostType;
  userId: string | undefined;
  edit: () => void;
}) {
  return (
    <section
      className="mx-auto w-full text-xl"
      aria-label="post details"
    >
      <div className="space-y-1 p-4 lg:px-0 lg:pt-6 xl:pt-7">
        <h1 className="text-4xl font-bold text-violet-800 lg:text-5xl">
          {post.name}
        </h1>
        <p className="text-sm font-medium lg:text-base">
          posted by
          <span className="text-violet-800">
            {" " + post.user.username}
          </span>
        </p>
      </div>
      <div className="w-content relative z-10 rounded-lg border">
        <div className="absolute top-0 z-10 h-full w-full bg-stone-300 opacity-60 blur-sm"></div>
        <img
          className="relative z-30 mx-auto max-h-[70vh] min-w-[45%] max-w-full object-contain md:max-h-[60vh]"
          src={post.image}
          alt={post.name}
        />
      </div>
      <div className="p-4 py-2 lg:px-0">
        <div className="flex items-start justify-between lg:mt-1">
          <CommentsLikesCounts
            commentsCount={post.commentsCount}
            initialLikes={post.likesCount}
            liked={userId ? post.likes.includes(userId) : false}
            isUserLogged={!!userId}
            postId={post._id}
            inPage={true}
          />
          {post.user._id === userId && (
            <div className="space-x-2 text-base font-semibold md:text-lg xl:text-xl">
              <button
                onClick={edit}
                className="normal-btn rounded-lg px-1.5 py-[3px] text-stone-50 xl:px-2"
              >
                Edit
              </button>
              <DeleteButton postId={post._id} />{" "}
            </div>
          )}
        </div>
        <p className="my-2 sm:mb-3 lg:mb-4 lg:text-xl xl:mb-5 xl:mt-3 xl:text-[22px]">
          {post.description}
        </p>
        <PostBottomLine post={post} inPage={true} />
      </div>
    </section>
  );
}

import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchApi } from "../../fetchApi";
import { queryClient } from "../../main";
import { CommentType } from "../../types";
import { appContext } from "../../appContext";

type PostCommentFormProps = {
  postId: string;
  parentId?: string | null;
  cancelReply?: () => void;
};

export default function PostCommentForm({
  postId,
  parentId = null,
  cancelReply,
}: PostCommentFormProps) {
  const [newComment, setNewComment] = useState("");

  const {
    mutate: postComment,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: (parentId: string | null = null) => {
      return fetchApi<CommentType[]>(
        "comments" + "/" + postId,
        {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            parentId: parentId,
            content: newComment,
          }),
        },
        true
      );
    },
    onSuccess: comments => {
      queryClient.setQueryData(["comments", postId], comments);
      setNewComment("");
      if (cancelReply) cancelReply();
    },
  });
  const { user } = useContext(appContext).userQuery;
  const inputRef = useRef<any>();
  useEffect(() => {
    if (cancelReply) inputRef.current?.focus();
  }, [cancelReply]);
  return (
    user && (
      <form
        className="mb-2 md:mb-3 lg:mb-4"
        onSubmit={e => {
          e.preventDefault();
          postComment(parentId);
        }}>
        <label
          htmlFor="content"
          aria-label="add a comment"
          className="grid gap-2 md:gap-3 md:text-xl lg:gap-4">
          {!cancelReply && (
            <span className="2x:text-[24px] text-base font-bold text-violet-800 sm:text-lg xl:text-[22px] dark:text-violet-400">
              Add a comment
            </span>
          )}
          <input
            ref={inputRef}
            type="text"
            name="content"
            id="content"
            required={true}
            minLength={3}
            maxLength={200}
            onChange={e => setNewComment(e.target.value)}
            value={newComment}
            className="mb-2 w-full break-all rounded-lg border-[2px] border-violet-800 pb-[4ch] pl-1 text-base lg:text-lg xl:text-[20px] dark:border-violet-400 dark:bg-zinc-800"
          />
        </label>

        {isError && (
          <p className="mb-2 font-semibold text-red-900 dark:text-red-500">
            {error?.message}
          </p>
        )}

        <div className="space-x-1.5 lg:text-lg xl:text-[20px]">
          <button
            className="normal-btn rounded-lg px-1.5 py-0.5"
            type="submit"
            disabled={isPending}>
            Submit
          </button>

          {cancelReply && (
            <button
              className="rounded-lg border-2 border-stone-800 px-1.5 text-stone-800 hover:border-stone-700 hover:text-stone-700 active:bg-stone-400 dark:border-stone-400 dark:text-stone-400 dark:hover:border-stone-200 dark:hover:text-stone-200 dark:active:bg-stone-200 dark:active:text-stone-600"
              onClick={cancelReply}>
              Cancel
            </button>
          )}
        </div>
      </form>
    )
  );
}

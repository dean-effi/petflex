import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../fetchApi";

export default function DeleteButton({ postId }: { postId: string }) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate: deletePost } = useMutation({
    mutationFn: () =>
      fetchApi("posts/" + postId, { method: "DELETE" }, true),
    onSuccess: () => {
      navigate("/");
    },
  });
  return (
    <>
      {isDeleting ? (
        <div className="fixed right-[50%] top-[25%] z-[100] w-[300px] translate-x-[50%] gap-2 rounded-md border-[10px] bg-stone-200 p-2 text-center font-semibold text-violet-800 shadow-[3px_4px_2px] shadow-violet-300 sm:w-[350px] sm:p-4 md:w-[400px] lg:w-[500px] lg:p-6">
          <p>Are you sure you want to delete this post?</p>
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              onClick={() => deletePost()}
              className="normal-btn rounded-lg px-1.5 py-[2px]"
            >
              Delete
            </button>
            <button
              onClick={() => setIsDeleting(false)}
              className="rounded-lg border-2 border-stone-800 px-1 text-stone-800 hover:border-stone-500 hover:text-stone-500 active:bg-stone-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsDeleting(true)}
          className="rounded-lg border-2 border-stone-800 px-1.5 py-0.5 text-stone-800 hover:border-red-500 hover:text-red-500 active:bg-red-200"
        >
          Delete
        </button>
      )}
    </>
  );
}

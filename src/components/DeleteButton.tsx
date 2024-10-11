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
        <div className="w-[500px] gap-2 border-[10px] border-double border-purple-400 bg-slate-200 p-4 text-center">
          <p>Are you sure you want to delete this post?</p>
          <div className="mt-5 flex justify-center gap-2">
            <button
              onClick={() => deletePost()}
              className="rounded-lg border border-red-500 p-1 text-xl text-red-700"
            >
              Yes
            </button>
            <button
              onClick={() => setIsDeleting(false)}
              className="rounded-lg border border-slate-500 p-1 text-xl text-slate-700"
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsDeleting(true)}
          className="rounded-lg border border-red-500 p-1 text-xl text-red-700"
        >
          Delete
        </button>
      )}
    </>
  );
}

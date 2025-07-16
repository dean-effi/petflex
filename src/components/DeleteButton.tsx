import { useState } from "react";
import DeletePrompt from "./DeletePrompt";
import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";

export default function DeleteButton({
  children,
  id,
  onSuccess,
}: {
  onSuccess: () => void;
  id: string;
  children: React.ReactNode;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate: deletePost } = useMutation({
    mutationFn: () =>
      fetchApi(`posts/${id}`, { method: "DELETE" }, true),
    onSuccess,
  });

  return (
    <>
      {isDeleting ? (
        <DeletePrompt
          deleteFn={deletePost}
          setIsDeleting={setIsDeleting}
        />
      ) : (
        ""
      )}
      <div
        className="inline-block"
        onClick={() => setIsDeleting(true)}>
        {children}
      </div>
    </>
  );
}

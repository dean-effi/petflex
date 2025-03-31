import { useState } from "react";
import DeletePrompt from "./DeletePrompt";

export default function DeleteButton({
  deleteFn,
  children,
}: {
  deleteFn: () => void;
  children: React.ReactNode;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      {isDeleting ? (
        <DeletePrompt
          deleteFn={deleteFn}
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

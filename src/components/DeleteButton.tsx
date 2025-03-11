import { useState } from "react";

export default function DeleteButton({
  deleteFn,
  children,
}: {
  deleteFn: () => void;
  children: React.ReactNode;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  //a "generic" delete btn with a prompt when pressed, just to run a function when accepted
  return (
    <>
      {isDeleting ? (
        <div className="fixed right-[50%] top-[25%] z-[100] w-[300px] translate-x-[50%] gap-2 rounded-md bg-stone-200 p-4 text-center font-semibold text-violet-800 shadow-[3px_4px_2px] shadow-violet-300 sm:w-[350px] sm:p-6 md:w-[400px] lg:w-[500px] lg:p-8 dark:bg-zinc-700 dark:text-violet-400">
          <p>Are you sure you want to delete this post?</p>
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                deleteFn();
                setIsDeleting(false);
              }}
              className="normal-btn rounded-lg px-1.5 py-[2px]">
              Delete
            </button>
            <button
              onClick={() => setIsDeleting(false)}
              className="rounded-lg border-2 border-stone-800 px-1 text-stone-800 hover:border-stone-500 hover:text-stone-500 active:bg-stone-200 dark:border-stone-400 dark:text-stone-300 dark:active:bg-zinc-300">
              Cancel
            </button>
          </div>
        </div>
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

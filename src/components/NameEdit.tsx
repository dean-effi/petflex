import { useEffect, useState } from "react";
import { queryClient } from "../main";
import { QueryError, User } from "../types";
import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import Pen from "../assets/pen.svg?react";

export default function NameEdit({
  user,
}: {
  user: User | undefined;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username);
  const nameMut = useMutation({
    mutationFn: () =>
      fetchApi<{ user: User; token: string }>(
        "users/self",
        {
          headers: {
            "content-type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({ username }),
        },
        true
      ),
    onSuccess: ({ user, token }) => {
      localStorage.setItem("token", "bearer " + token);
      queryClient.setQueryData(["user"], { ...user });
      setIsEditing(false);
    },

    onError: (err: QueryError) => err,
  });

  useEffect(() => {
    setUsername(user?.username);
  }, [user?.username]);

  return (
    <div className="mb-12">
      <div className="m-auto my-4 flex justify-center">
        <div className="mb-2 flex items-center">
          <h1 className="mr-2 text-center text-[42px] font-semibold sm:mr-2.5 md:text-5xl">
            Hello, {`${!isEditing ? user?.username || "" : ""}`}
          </h1>
          {isEditing && (
            <input
              name="username"
              maxLength={20}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") nameMut.mutate();
              }}
              value={username}
              type="text"
              aria-label="new username"
              style={{
                width: (username?.length || 5 + 1).toString() + "ch",
              }}
              className="gray-bg ml-1 rounded-md bg-stone-200 p-1 pl-2 pr-0 text-[42px] font-semibold text-stone-800 md:text-5xl dark:bg-zinc-800 dark:text-stone-50"
            />
          )}
        </div>

        {!isEditing && (
          <button
            disabled={nameMut.isPending}
            onClick={() => setIsEditing(true)}
            aria-label="edit username">
            <Pen className="self-start fill-neutral-950 dark:fill-stone-100"></Pen>
          </button>
        )}
      </div>
      {nameMut.isError && isEditing && (
        <p className="mb-4 text-center font-bold text-red-800 dark:text-red-500">
          {nameMut.error.message}
        </p>
      )}
      {isEditing && (
        <div className="flex justify-center gap-2">
          <button
            type="submit"
            disabled={nameMut.isPending}
            onClick={() => nameMut.mutate()}
            className="normal-btn rounded-[10px] p-1.5 px-[14px] text-lg sm:text-xl">
            save username
          </button>
          <button
            onClick={() => {
              setUsername(user?.username);
              setIsEditing(false);
            }}
            className="rounded-[10px] border-2 border-stone-800 p-1.5 px-[14px] text-lg text-stone-800 hover:border-stone-700 hover:text-stone-700 active:bg-stone-400 sm:text-xl dark:border-stone-400 dark:text-stone-400 dark:hover:border-stone-200 dark:hover:text-stone-200 dark:active:bg-stone-200 dark:active:text-stone-600">
            cancel
          </button>
        </div>
      )}
    </div>
  );
}

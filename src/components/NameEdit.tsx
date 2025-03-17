import { useEffect, useState } from "react";
import { queryClient } from "../main";
import { QueryError, User } from "../types";
import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";

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
    <div className="my-4 flex gap-3">
      {!isEditing ? (
        <h1 className="text-3xl">Hello {user?.username}</h1>
      ) : (
        <div>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="text-black"
          />
          {nameMut.isError && (
            <p className="text-center font-bold text-red-800 dark:text-red-500">
              {nameMut.error.message}
            </p>
          )}
        </div>
      )}
      {!isEditing ? (
        <button
          disabled={nameMut.isPending}
          onClick={() => setIsEditing(true)}>
          edit
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            className="bg-emerald-500 px-1 py-0.5 active:bg-emerald-300 disabled:bg-gray-500"
            disabled={nameMut.isPending}
            onClick={() => nameMut.mutate()}>
            Submit
          </button>
          <button
            onClick={() => {
              setUsername(user?.username);
              setIsEditing(false);
            }}
            className="bg-red-500 px-1 py-0.5 active:bg-red-300">
            cancel
          </button>
        </div>
      )}
    </div>
  );
}

import { useMutation } from "@tanstack/react-query";
import UserForm from "../components/UserForm";
import { QueryError, User, UserDetails } from "../types";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";
import { fetchApi } from "../fetchApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMut = useMutation({
    mutationFn: (userDetails: UserDetails) =>
      fetchApi<{ user: User; token: string }>(
        "login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userDetails),
        },
        false
      ),
    onSuccess: ({ user, token }) => {
      localStorage.setItem("token", "bearer " + token);
      queryClient.setQueryData(["user"], { ...user });
      navigate("/");
    },
    onError: (err: QueryError) => err,
  });

  return (
    <>
      <UserForm
        onFormSubmit={loginMut.mutate}
        formType="login"
        errorMsg={loginMut.isError ? loginMut.error.message : null}
        isPending={loginMut.isPending}
      />
    </>
  );
}

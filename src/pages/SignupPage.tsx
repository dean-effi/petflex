import { useMutation } from "@tanstack/react-query";
import UserForm from "../components/UserForm";
import { QueryError, User, UserDetails } from "../types";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../fetchApi";
import { queryClient } from "../main";

export default function SignupPage() {
  const navigate = useNavigate();

  const signupMut = useMutation({
    mutationFn: (userDetails: UserDetails) =>
      fetchApi<{ user: User; token: string }>(
        "users",
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
        onFormSubmit={signupMut.mutate}
        formType="signup"
        errorMsg={signupMut.isError ? signupMut.error.message : null}
        isPending={signupMut.isPending}
      />
    </>
  );
}

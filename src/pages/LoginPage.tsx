import { useMutation } from "@tanstack/react-query";
import UserForm from "../components/UserForm";
import { UserDetails } from "../types";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMut = useMutation({
    mutationFn: logInUser,
    onSuccess: ({ user, token }) => {
      localStorage.setItem("token", "bearer " + token);
      queryClient.setQueryData(["user"], { user });
      navigate("/");
    },
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

async function logInUser(userDetails: UserDetails) {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userDetails),
  }).catch(() => {
    throw new Error("Unexpected error, try again");
  });
  const responseJson = await response.json().catch(() => {
    throw new Error("Unexpected error, try again");
  });
  if (!response.ok) {
    throw new Error(responseJson.errors[0].msg);
  }
  return responseJson;
}

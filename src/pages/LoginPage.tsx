import { useMutation } from "@tanstack/react-query";
import UserForm from "../components/UserForm";
import { QueryError, UserDetails } from "../types";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";
import { fetchApi } from "../fetchApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMut = useMutation({
    mutationFn: (userDetails: UserDetails) =>
      fetchApi(
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

// async function logInUser(userDetails: UserDetails) {
//   const response = await fetch(
//     import.meta.env.VITE_ENDPOINT + "login",
//     {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(userDetails),
//     }
//   ).catch(() => {
//     throw new Error("Unexpected error, try again");
//   });
//   const responseJson = await response.json().catch(() => {
//     throw new Error("Unexpected error, try again");
//   });
//   if (!response.ok) {
//     throw new Error(responseJson.errors[0].msg);
//   }
//   return responseJson;
// }

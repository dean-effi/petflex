import { useMutation } from "@tanstack/react-query";
import UserForm from "../components/UserForm";
import { QueryError, UserDetails } from "../types";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../fetchApi";

export default function SignupPage() {
  const navigate = useNavigate();

  const signupMut = useMutation({
    mutationFn: (userDetails: UserDetails) =>
      fetchApi(
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
    onSuccess: () => {
      return navigate("/login");
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

// async function signUser(userDetails: UserDetails) {
//   const response = await fetch(
//     import.meta.env.VITE_ENDPOINT + "users",
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

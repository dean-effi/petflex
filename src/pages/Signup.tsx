import { useMutation } from "@tanstack/react-query";
import UserForm from "../components/UserForm";
import { UserDetails } from "../types";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const signupMut = useMutation({
    mutationFn: signUser,
    onSuccess: () => {
      return navigate("/login");
    },
  });
  function onSignup(userDetails: UserDetails) {
    console.log("signed up", userDetails);
    signupMut.mutate(userDetails);
    return;
  }
  if (signupMut.error) {
    console.log(signupMut.error.message);
  }
  return (
    <>
      <UserForm
        onFormSubmit={onSignup}
        formType="signup"
        errorMsg={signupMut.isError ? signupMut.error.message : null}
      />
    </>
  );
}

async function signUser(userDetails: UserDetails) {
  console.log("mutation function");
  console.log(JSON.stringify(userDetails));
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });
  const responseJson = await response.json().catch(() => {
    throw new Error("Unexpected error, try again");
  });
  if (!response.ok) {
    console.log("not okayyy");
    throw new Error(responseJson.errors[0].msg);
  }
  return response;
}

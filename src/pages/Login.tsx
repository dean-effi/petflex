import UserForm from "../components/UserForm";
import { UserDetails } from "../types";

export default function Login() {
  function onLogin(userDetails: UserDetails) {
    console.log("logged in", userDetails);
    return;
  }
  return (
    <>
      <UserForm
        onFormSubmit={onLogin}
        formType="login"
        errorMsg={null}
      />
    </>
  );
}

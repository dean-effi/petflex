import UserForm from "../components/UserForm";
import { UserDetails } from "../types";

export default function LoginPage() {
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
        isPending={true}
      />
    </>
  );
}

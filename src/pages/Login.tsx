import UserForm from "../components/UserForm";

export default function Login() {
  function onLogin(userDetails: {
    username: string;
    password: string;
  }) {
    console.log("logged in", userDetails);
    return;
  }
  return (
    <>
      <UserForm onFormSubmit={onLogin} formType="login" />
    </>
  );
}

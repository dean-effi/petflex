import UserForm from "../components/UserForm";

export default function Signup() {
  function onSignup(userDetails: {
    username: string;
    password: string;
  }) {
    console.log("signed up", userDetails);
    return;
  }
  return (
    <>
      <UserForm onFormSubmit={onSignup} formType="signup" />
    </>
  );
}

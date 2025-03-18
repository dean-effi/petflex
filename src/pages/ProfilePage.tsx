import ErrorPage from "./ErrorPage";
import { appContext } from "../appContext";
import { useContext } from "react";
import SelfPosts from "../components/SelfPosts";
import NameEdit from "../components/NameEdit";

export default function ProfilePage() {
  const { userQuery } = useContext(appContext);
  const user = userQuery.user;

  if (!user && !userQuery.userLoading) {
    return <ErrorPage status={401} />;
  }

  return (
    <div className="min-h-[100vh] py-4 pb-16">
      <NameEdit user={user} />
      <SelfPosts />
    </div>
  );
}

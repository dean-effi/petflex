import { PostType } from "../types";

import GenderIcons from "../assets/GenderIcons";
import { useContext } from "react";
import { appContext } from "../appContext";

export default function PostBottomLine({
  post,
  inPage = false,
}: {
  post: PostType;
  inPage?: boolean;
}) {
  const isDark = useContext(appContext).isDark;
  return (
    <p
      className={
        "h-content flex items-center gap-0.5 self-end text-xs font-light capitalize sm:text-sm md:text-base" +
        (inPage ? " lg:text-lg" : "")
      }>
      {post.petType + " "}|
      <GenderIcons gender={post.gender} isDark={isDark} />|{" "}
      {post.age.years + " years old"} |
      {" created at " + new Date(post.createdAt).toLocaleDateString()}
    </p>
  );
}

import { PostType } from "../types";

import GenderIcons from "../assets/GenderIcons";

export default function PostBottomLine({
  post,
  inPage = false,
}: {
  post: PostType;
  inPage?: boolean;
}) {
  return (
    <p
      className={
        "h-content flex items-center gap-0.5 self-end text-xs font-light capitalize sm:text-sm md:text-base" +
        (inPage ? " lg:text-lg" : "")
      }>
      {post.petType + " "}|
      <GenderIcons gender={post.gender} />|{" "}
      {post.age.years + " years old"} |
      {" created at " + new Date(post.createdAt).toLocaleDateString()}
    </p>
  );
}

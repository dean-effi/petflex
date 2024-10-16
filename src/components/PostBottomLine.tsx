import { PostType } from "../types";
import maleIcon from "../assets/male.svg";
import femaleIcon from "../assets/female.svg";
import questionIcon from "../assets/question.svg";

export default function PetDetails({ post }: { post: PostType }) {
  return (
    <div className="self-end">
      <p className="h-content flex items-center gap-0.5 text-sm font-light md:text-base">
        {
          <img
            src={
              post.gender == "male"
                ? maleIcon
                : post.gender === "female"
                  ? femaleIcon
                  : questionIcon
            }
            className="inline"
            alt={post.gender}
          />
        }
        | {post.age.years + "yo"} |
        {" created at " +
          new Date(post.createdAt).toLocaleDateString()}{" "}
      </p>
    </div>
  );
}

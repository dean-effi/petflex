import { useMutation, useQuery } from "@tanstack/react-query";
import { PostType, QueryError } from "../types";
import { fetchApi } from "../fetchApi";
import PostPreview from "../components/home-page/PostPreview";
import DeleteButton from "../components/DeleteButton";

export default function ProfilePage() {
  const { data: posts, refetch } = useQuery<PostType[], QueryError>({
    queryKey: ["posts", "self"],
    queryFn: () => fetchApi("posts/self", { method: "GET" }, true),
  });
  const { mutate: deletePost } = useMutation({
    mutationFn: (id: string) =>
      fetchApi(`posts/${id}`, { method: "DELETE" }, true),
    onSuccess: () => refetch(),
  });
  console.log(posts);
  if (!posts) return;
  return (
    <div>
      <h1>Hello profile</h1>
      {posts.map(post => {
        return (
          <div>
            <DeleteButton deleteFn={() => deletePost(post._id)}>
              <button className="normal-btn">delete meee</button>
            </DeleteButton>
            <PostPreview post={post} />
          </div>
        );
      })}
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchApi } from "../fetchApi";
import { QueryError } from "../types";
import ErrorPage from "./ErrorPage";

export default function PostPage() {
  const { postId } = useParams();
  console.log("postidddd", postId);
  const { data, ...postQuery } = useQuery<any, QueryError>({
    queryKey: ["posts", postId],
    queryFn: () =>
      fetchApi(
        "posts/" + postId,
        {
          method: "GET",
        },
        false
      ),
  });
  if (postQuery.isError) {
    return <ErrorPage status={postQuery.error.status} />;
  }
  if (data) {
    return (
      <div className="p-6 text-xl">
        <div className="text-4xl">{data.name}</div>
        <img src={data.image}></img>
        <p>{data.description}</p>
        <p>{data.age.years} years old!</p>
      </div>
    );
  }
}

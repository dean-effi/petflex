import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchApi } from "../fetchApi";
import { CommentType, PostType, QueryError } from "../types";
import ErrorPage from "./ErrorPage";
import { ReactElement } from "react";

export default function PostPage() {
  const { postId } = useParams();

  const { data: post, ...postQuery } = useQuery<PostType, QueryError>(
    {
      queryKey: ["posts", postId],
      queryFn: () =>
        fetchApi(
          "posts/" + postId,
          {
            method: "GET",
          },
          false
        ),
    }
  );

  const { data: comments, ...commentsQuery } = useQuery<
    CommentType[],
    QueryError
  >({
    queryKey: ["comments", postId],
    queryFn: () =>
      fetchApi(
        "comments/" + postId,
        {
          method: "GET",
        },
        false
      ),
  });
  console.log("commentsssssss ", comments);
  console.log(commentsQuery.error);
  if (postQuery.isLoading) {
    return <p>loading...</p>;
  }
  if (postQuery.isError) {
    return <ErrorPage status={postQuery.error.status} />;
  }

  let commentsElements: ReactElement<any>[] = [];
  if (comments) {
    const topLevelComments = comments.filter(
      comment => comment.parentId == null
    );

    commentsElements = topLevelComments.map(comment => {
      return (
        <Comment
          key={comment._id}
          allComments={comments}
          comment={comment}
        />
      );
    });
  }

  if (post) {
    return (
      <>
        <div className="p-6 text-xl">
          <h1 className="text-4xl">{post.name}</h1>
          <img className="max-h-[70vh]" src={post.image}></img>
          <p>{post.description}</p>
          <p>{post.age.years} years old!</p>
          <p>created by: {post.user.username}</p>
          at {new Date(post.createdAt).toLocaleDateString()}
          <br />
          he is a {post.petType}
          <br />
          and recieved {post.likesCount} likes!
        </div>
        <section className="mt-20 text-lg">
          <h1 className="text-5xl">Comments:</h1>
          {commentsElements}
        </section>
      </>
    );
  }
}

type CommentProps = {
  comment: CommentType;
  allComments: CommentType[];
};
function Comment({ comment, allComments }: CommentProps) {
  const replies = allComments.filter(
    reply => reply.parentId === comment._id
  );
  console.log("replies", replies);
  return (
    <>
      <div className="m-2 mt-0 border-l-2 border-stone-500">
        <div className="w-full border border-blue-700 p-2 text-xl shadow-lg">
          <p>{comment.content}</p>
          <p>by: {comment.user.username}</p>
          <p className="text-base">
            at: {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
        {replies.map(reply => {
          return (
            <div key={comment._id} className="ml-6 mt-1">
              <Comment comment={reply} allComments={allComments} />
            </div>
          );
        })}
      </div>
    </>
  );
}

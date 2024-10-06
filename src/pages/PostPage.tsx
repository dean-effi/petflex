import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchApi } from "../fetchApi";
import { CommentType, PostType, QueryError } from "../types";
import ErrorPage from "./ErrorPage";
import { ReactElement } from "react";
import Comment from "../components/Comment";

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

  const { data: comments } = useQuery<CommentType[], QueryError>({
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
  if (postQuery.isLoading) {
    return <p>loading...</p>;
  }
  if (postQuery.isError) {
    return <ErrorPage status={postQuery.error.status} />;
  }

  //if there are comments, assign to reply and top level comments, then generate comment elements,
  // who will recursivley render their replies
  let commentsElements: ReactElement<any>[] = [];
  if (comments) {
    const topLevelComments: CommentType[] = [];
    const replyComments: CommentType[] = [];

    comments.forEach(comment => {
      if (comment.parentId == null) {
        topLevelComments.push(comment);
      } else {
        replyComments.push(comment);
      }
    });
    commentsElements = topLevelComments.map(comment => {
      return (
        <Comment
          key={comment._id}
          replyComments={replyComments}
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

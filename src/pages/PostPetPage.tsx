import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";

export default function PostPetPage() {
  const postMut = useMutation({
    mutationFn: (newPet: any) => postPet(newPet),
  });

  function onFormSubmit(e: FormEvent) {
    console.log("form");
    e.preventDefault();
    postMut.mutate({
      name: "hello",
    });
  }
  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

async function postPet(newPet: any) {
  console.log("submiting", newPet);
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      console.log("no token provided");
      throw new Error("no token provided");
    }
    const data = new FormData();
    data.append("name", newPet.name);
    const response = await fetch(
      import.meta.env.VITE_ENDPOINT + "posts/fake",
      {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: data,
      }
    );
    const responseJson = await response.json();
    return responseJson;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("error retreving the user");
  }
}

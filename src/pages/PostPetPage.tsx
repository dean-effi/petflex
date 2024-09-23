import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

export default function PostPetPage() {
  const [newPet, setNewPet] = useState({
    name: "",
    description: "",
  });

  console.log(newPet);
  const postMut = useMutation({
    mutationFn: (newPet: any) => postPet(newPet),
  });

  function onInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setNewPet({
      ...newPet,
      [e.target.name]: e.target.value,
    });
  }
  function onFormSubmit(e: FormEvent) {
    console.log("form");
    e.preventDefault();
    postMut.mutate(newPet);
  }
  return (
    <form
      onSubmit={onFormSubmit}
      className="grid justify-start p-4 text-xl"
    >
      <label>
        Name:
        <input
          value={newPet.name}
          onChange={onInputChange}
          className="border border-black"
          type="text"
          name="name"
        />
      </label>
      <label>
        description:
        <textarea
          value={newPet.description}
          onChange={onInputChange}
          className="border border-black"
          name="description"
        />
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
    data.append("description", newPet.description);
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

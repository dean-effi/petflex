import { FormEvent, useState } from "react";
import { PostSubmitionObject, PostType, QueryError } from "../types";
import { UseMutationResult } from "@tanstack/react-query";

type PostFormProps = {
  submitPost: (
    e: FormEvent<HTMLFormElement>,
    newPet: PostSubmitionObject
  ) => void;
  mutation: UseMutationResult<
    PostType,
    QueryError,
    PostSubmitionObject,
    unknown
  >;
  formType: "editing" | "posting";
  post?: PostType;
};

export default function PostForm({
  submitPost,
  mutation,
}: PostFormProps) {
  const { isError, error } = mutation;
  const [newPet, setNewPet] = useState<PostSubmitionObject>({
    name: "",
    description: "",
    birthDate: "",
    petType: "",
    gender: "male",
    image: null,
  });
  function onInputChange(e: React.ChangeEvent<any>) {
    setNewPet({
      ...newPet,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <form
      onSubmit={e => submitPost(e, newPet)}
      className="grid justify-start gap-6 p-6 text-xl"
    >
      <label>
        Name:
        <input
          value={newPet.name}
          minLength={3}
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
      <label>
        BirthDate:
        <input
          value={newPet.birthDate}
          onChange={onInputChange}
          className="border border-black"
          type="date"
          name="birthDate"
        />
      </label>
      <label>
        Pet Type:
        <select onChange={onInputChange} name="petType" id="petType">
          <option defaultChecked value={""}>
            select a type
          </option>
          <option value="dog">dog</option>
          <option value="cat">cat</option>
          <option value="hamster">hamster</option>
          <option value="bird">bird</option>
          <option value="fish">fish</option>
          <option value="lizard">lizard</option>
          <option value="other">other</option>
        </select>
      </label>

      <div>
        <label>
          Gender:
          <select onChange={onInputChange} name="gender" id="gender">
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">hamster</option>
          </select>
        </label>
      </div>
      <label>
        Image:
        <input
          required
          onChange={e =>
            setNewPet({
              ...newPet,
              image: e.target?.files ? e.target?.files[0] : null,
            })
          }
          className="border border-black"
          type="file"
          name="image"
        />
      </label>
      <button
        type="submit"
        className="normal-btn w-min rounded-md px-2 py-1"
      >
        Submit
      </button>
      <div className="pb-2 text-center font-bold text-red-800 xl:text-2xl">
        {isError && <p className="">{error.message}</p>}
      </div>
    </form>
  );
}

import { FormEvent, useState } from "react";
import { PostSubmitionObject, PostType, QueryError } from "../types";
import { UseMutationResult } from "@tanstack/react-query";
import ImageInput from "./ImageInput";
import getDateInputString from "../helpers/getDateInputString";

export default function PostForm({
  mutation,
  formType,
  post,
  cancelEdit,
}: PostFormProps) {
  const { isPending, isError, error } = mutation;
  const [clientError, setClientError] = useState("");
  const [newPet, setNewPet] = useState<PostSubmitionObject>({
    name: post?.name || "",
    description: post?.description || "",
    birthDate: post ? getDateInputString(post?.birthDate) : "",
    petType: post?.petType || "",
    gender: post?.gender || "male",
    image: null,
    isDead: post?.isDead || false,
  });

  function onInputChange(e: React.ChangeEvent<any>) {
    setNewPet({
      ...newPet,
      [e.target.name]: e.target.value,
    });
  }
  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newPet.image == null && formType === "posting") {
      setClientError("Please provide an image");
      return;
    }
    mutation.mutate(newPet);
  }
  return (
    <div className="mx-auto mt-4 w-[330px] sm:w-[410px] md:mt-6">
      {formType === "editing" && (
        <button
          onClick={cancelEdit}
          className="gray-bg mb-4 mt-2 rounded-lg px-2 py-1 hover:bg-stone-300 active:bg-stone-100 sm:mt-4 md:mb-5 dark:bg-zinc-800 dark:hover:bg-zinc-700">
          {"<- " + "Go back to page"}
        </button>
      )}
      <h1 className="text-xl font-semibold text-violet-800 md:mt-5 md:text-2xl lg:text-3xl dark:text-stone-50">
        {formType === "posting"
          ? "Create a post"
          : "Edit " + newPet.name}
      </h1>
      <form
        onSubmit={onFormSubmit}
        className="mt-4 grid gap-6 font-medium md:mt-6 md:gap-8 md:text-lg lg:text-xl">
        <label className="flex items-center gap-2">
          Name:
          <input
            required
            value={newPet.name}
            minLength={3}
            maxLength={20}
            onChange={onInputChange}
            className="gray-bg rounded-md pl-2 dark:bg-zinc-800"
            type="text"
            name="name"
          />
        </label>
        <div className="flex gap-3">
          <label className="flex items-center gap-1.5">
            Birth Date:
            <input
              required
              disabled={newPet.isDead}
              value={newPet.birthDate}
              onChange={onInputChange}
              className="gray-bg rounded-md px-1 py-[1px] dark:bg-zinc-800"
              type="date"
              name="birthDate"
            />
          </label>

          <label className="flex items-center gap-1.5">
            <input
              onChange={() => {
                setNewPet({ ...newPet, isDead: !newPet.isDead });
              }}
              name="isDead"
              type="checkBox"
              className="h-4 w-4 cursor-pointer accent-violet-800 dark:accent-violet-400"
              checked={newPet.isDead}
            />
            Is dead
          </label>
        </div>

        <label className="flex items-center gap-2">
          Pet Type:
          <select
            onChange={onInputChange}
            value={newPet.petType}
            name="petType"
            id="petType"
            className="normal-btn cursor-pointer rounded-md py-[1px] pl-2"
            required>
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

        <label className="flex items-center gap-2">
          Gender:
          <select
            onChange={onInputChange}
            value={newPet.gender}
            name="gender"
            id="gender"
            className="normal-btn cursor-pointer rounded-md py-[1px] pl-2"
            required>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="unknown">unknown</option>
          </select>
        </label>
        <label className="grid gap-1">
          Description:
          <textarea
            value={newPet.description}
            onChange={onInputChange}
            className="gray-bg max-w-[320px] rounded-md py-[1px] pl-1 sm:max-w-[400px] dark:bg-zinc-800"
            name="description"
            required
            rows={3}
            minLength={3}
            maxLength={1000}
          />
        </label>
        <div>
          {formType === "posting" && (
            <ImageInput setNewPet={setNewPet} />
          )}

          <div className="mt-1 pb-2 font-bold text-red-800 md:mt-2">
            {(isError || clientError) && (
              <p className="">{error?.message || clientError}</p>
            )}
          </div>
          <button
            type="submit"
            className="normal-btn mt-1 w-min rounded-md px-2 py-1 md:mt-2"
            disabled={isPending}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

type PostFormProps = {
  mutation: UseMutationResult<
    PostType,
    QueryError,
    PostSubmitionObject,
    unknown
  >;
  formType: "editing" | "posting";
  post?: PostType;
  cancelEdit?: () => void;
};

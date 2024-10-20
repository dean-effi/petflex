import { useMutation } from "@tanstack/react-query";
import { FormEvent, useContext, useState } from "react";
import { QueryError } from "../types";
import { postPet } from "../fetchApi";
import { appContext } from "../appContext";
import ErrorPage from "./ErrorPage";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";

export default function PostPetPage() {
  const navigate = useNavigate();
  const { user, userLoading } = useContext(appContext).userQuery;

  const [newPet, setNewPet] = useState<any>({
    name: "",
    description: "",
    birthDate: "",
    petType: "",
    gender: "male",
    image: null,
  });

  const postMut = useMutation({
    mutationFn: (newPet: any) => postPet(newPet),
    onError: (err: QueryError) => err,
    onSuccess: data => {
      queryClient.setQueryData(["posts", data.id], data);

      navigate("/" + data.id);
    },
  });

  function onInputChange(e: React.ChangeEvent<any>) {
    const value = e.target.value;

    setNewPet({
      ...newPet,
      [e.target.name]: value,
    });
  }
  function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    postMut.mutate(newPet);
  }

  if (!user && !userLoading) {
    return <ErrorPage status={401} />;
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
          <br />
          male:
          <input
            onChange={onInputChange}
            name="gender"
            value="male"
            type="radio"
            checked={newPet.gender === "male"}
          />
          female:
          <input
            onChange={onInputChange}
            name="gender"
            value="female"
            type="radio"
            checked={newPet.gender === "female"}
          />
          unknown:
          <input
            onChange={onInputChange}
            name="gender"
            value="unknown"
            type="radio"
            checked={newPet.gender === "unknown"}
          />
        </label>
      </div>
      <label>
        BirthDate:
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
      <button type="submit">Submit</button>
      <div className="pb-2 text-center font-bold text-red-800 xl:text-2xl">
        {postMut.isError && (
          <p className="">{postMut.error.message}</p>
        )}
      </div>
    </form>
  );
}

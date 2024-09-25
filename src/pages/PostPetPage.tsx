import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { QueryError } from "../types";
import { postPet } from "../fetchApi";

export default function PostPetPage() {
  const [newPet, setNewPet] = useState<any>({
    name: "",
    description: "",
    birthDate: "",
    petType: "",
    gender: "male",
    image: null,
  });

  console.log(newPet.image);

  console.log(newPet);
  const postMut = useMutation({
    mutationFn: (newPet: any) => postPet(newPet),
    onError: (err: QueryError) => err,
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

// async function postPet(newPet: any) {
//   console.log("submiting", newPet);
//   const token = localStorage.getItem("token");
//   if (!token) {
//     console.log("no token provided");
//     throw new Error("no token provided");
//   }
//   const data = new FormData();
//   data.append("name", newPet.name);
//   data.append("description", newPet.description);
//   data.append("petType", newPet.petType);
//   data.append("gender", newPet.gender);
//   data.append("birthDate", newPet.birthDate);
//   data.append("image", newPet.image);

//   const response = await fetch(
//     import.meta.env.VITE_ENDPOINT + "posts",
//     {
//       method: "POST",
//       headers: {
//         authorization: token,
//       },
//       body: data,
//     }
//   );

//   const responseJson = await response.json().catch(() => {
//     throw new Error("Unexpected error, try again");
//   });
//   if (!response.ok) {
//     return Promise.reject({
//       hello: responseJson.errors[0].msg,
//       status: response.status,
//     });
//   }

//   console.log("response good ", responseJson);
//   return responseJson;
// }

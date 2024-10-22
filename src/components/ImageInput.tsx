import { PostSubmitionObject } from "../types";

export default function ImageInput({
  setNewPet,
}: {
  setNewPet: React.Dispatch<
    React.SetStateAction<PostSubmitionObject>
  >;
}) {
  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    console.log(e.target?.files[0].size / 1024 / 1024 + "mb");

    setNewPet(newPet => {
      return { ...newPet, image: e.target?.files![0] };
    });
  }

  return (
    <input
      required
      onChange={onImageChange}
      className="border border-black"
      type="file"
      name="image"
    />
  );
}

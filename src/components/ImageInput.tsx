import Compressor from "compressorjs";
import { PostSubmitionObject } from "../types";
export default function ImageInput({
  setNewPet,
}: {
  setNewPet: React.Dispatch<
    React.SetStateAction<PostSubmitionObject>
  >;
}) {
  async function onImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    console.log("starting image compression");
    new Compressor(file, {
      quality: file.size / 1024 / 1024 > 3 ? 0.4 : 0.7,
      strict: true,
      success(result: File) {
        setNewPet(newPet => {
          return { ...newPet, image: result };
        });
        console.log(
          "size before: ",
          file.size / 1024 / 1024 + "mb",
          "size after: ",
          result.size / 1024 / 1024 + "mb"
        );
      },
      error() {
        setNewPet(newPet => {
          return { ...newPet, image: file };
        });
      },
    });
  }

  return (
    <input
      required
      accept="image/*"
      onChange={onImageChange}
      className="border border-black"
      type="file"
      name="image"
    />
  );
}

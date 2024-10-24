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
    const fileSize = file.size / 1024 / 1024 > 3 ? 0.5 : 0.8;
    console.log("starting image compression");
    new Compressor(file, {
      mimeType: "image/webp",
      quality: fileSize > 3 ? 0.5 : fileSize > 1 ? 0.7 : 0.8,
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
        console.log(result);
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

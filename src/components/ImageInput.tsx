import Compressor from "compressorjs";
import { PostSubmitionObject } from "../types";
import { useState } from "react";
export default function ImageInput({
  setNewPet,
}: {
  setNewPet: React.Dispatch<
    React.SetStateAction<PostSubmitionObject>
  >;
}) {
  const [imgPreview, setImgPreview] = useState("");

  function setPreview(file: File) {
    if (!file) return;
    const reader = new FileReader();

    reader.readAsDataURL(file!);
    reader.onload = () => {
      console.log(typeof reader.result);
      setImgPreview(reader.result as string);
    };
  }
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

        setPreview(result);
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
        setPreview(file);
      },
    });
  }

  return (
    <>
      <input
        required
        accept="image/*"
        onChange={onImageChange}
        className="border border-black"
        type="file"
        name="image"
      />
      <img
        className="mt-4 h-[250px] w-[320px] rounded-sm bg-slate-200 object-cover object-center sm:w-[400px]"
        src={imgPreview}
        alt=""
      />
    </>
  );
}

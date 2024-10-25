import Compressor from "compressorjs";
import { PostSubmitionObject } from "../types";
import { useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Spinner from "./Spinner";

export default function ImageInput({
  setNewPet,
}: {
  setNewPet: React.Dispatch<
    React.SetStateAction<PostSubmitionObject>
  >;
}) {
  const [preview, setPreview] = useState("");
  const [fileError, SetFileError] = useState("");
  const [loading, setLoading] = useState(false);

  //react drop zone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onImageChange,
    maxFiles: 1,
    accept: { "image/*": [] },
  });

  function getPreview(file: File) {
    if (!file) return;
    const reader = new FileReader();

    reader.readAsDataURL(file!);
    reader.onload = () => {
      setPreview(reader.result as string);
    };
  }
  async function onImageChange(
    files: File[] | null,
    rejectedFiles?: FileRejection[] | null
  ) {
    if (rejectedFiles?.length) {
      SetFileError(rejectedFiles[0].errors[0].message);
      return;
    }
    if (!files) return;
    const file = files[0];
    const fileSize = file.size / 1000 / 1000;

    setLoading(true);
    new Compressor(file, {
      mimeType: "image/webp",
      quality: fileSize > 3 ? 0.5 : fileSize > 1 ? 0.7 : 0.8,
      strict: true,
      success(result: File) {
        setLoading(false);
        if (result.size / 1000 / 1000 > 2.9) {
          SetFileError("image is too large");
          return;
        }

        SetFileError("");
        setNewPet(newPet => {
          return { ...newPet, image: result };
        });

        getPreview(result);
        console.log(
          "original size: ",
          file.size / 1000 / 1000 + "mb",
          "size after: ",
          result.size / 1000 / 1000 + "mb"
        );
      },
      error() {
        setLoading(false);
        setNewPet(newPet => {
          return { ...newPet, image: file };
        });
        getPreview(file);
      },
    });
  }

  return (
    <div className="relative">
      <label aria-label="add image" {...getRootProps()}>
        <input
          {...getInputProps({
            name: "image",
          })}
        />
        <div className="gray-bg relative flex h-[250px] w-[320px] items-center justify-center rounded-md sm:w-[400px]">
          {isDragActive ? (
            <p>Image ready to drop!</p>
          ) : loading ? (
            <Spinner width={24} />
          ) : preview ? (
            <img
              className="h-full w-full object-cover object-center"
              src={preview}
              alt=""
            />
          ) : (
            <p className="text-center">
              Drag and drop some image here <br />{" "}
              <span>or click to select</span>
            </p>
          )}
        </div>
      </label>
      {fileError && (
        <p className="text-xl text-red-800">{fileError}</p>
      )}
      <p className="text-sm">
        *image ratio will preserve for the full pet's page
      </p>
      <button
        type="button"
        aria-label="remove image"
        onClick={e => {
          e.stopPropagation();
          setPreview("");
          setNewPet(newPet => {
            return { ...newPet, image: null };
          });
        }}
        className="normal-btn absolute left-2 top-2 rounded-[50%] border border-white px-1.5 text-base"
      >
        X
      </button>
    </div>
  );
}

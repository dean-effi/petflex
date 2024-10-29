import Compressor from "compressorjs";
import { PostSubmitionObject } from "../types";
import { useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Spinner from "./Spinner";
import uploadIcon from "../assets/upload.svg";
export default function ImageInput({
  setNewPet,
}: {
  setNewPet: React.Dispatch<
    React.SetStateAction<PostSubmitionObject>
  >;
}) {
  const [image, setImage] = useState({
    preview: "",
    error: "",
    loading: false,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onImageChange,
    maxFiles: 1,
    noClick: true,
    accept: { "image/*": [] },
  });

  function setPreview(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = () => {
      setImage({
        preview: reader.result as string,
        error: "",
        loading: false,
      });
    };
  }
  async function onImageChange(
    files: File[] | null,
    rejectedFiles?: FileRejection[] | null
  ) {
    if (rejectedFiles?.length) {
      setImage({
        ...image,
        error: rejectedFiles[0].errors[0].message,
      });
      return;
    }
    if (!files) return;
    const file = files[0];
    const fileSize = file.size / 1000 / 1000;

    setImage({ ...image, loading: true });
    new Compressor(file, {
      mimeType: "image/webp",
      quality: fileSize > 3 ? 0.5 : fileSize > 1 ? 0.7 : 0.8,
      strict: true,
      success(result: File) {
        if (result.size / 1000 / 1000 > 4.9) {
          setImage({ ...image, error: "image is too large" });
          return;
        }
        setPreview(result);
        setNewPet(newPet => {
          return { ...newPet, image: result };
        });
      },
      error() {
        setPreview(file);
        setNewPet(newPet => {
          return { ...newPet, image: file };
        });
      },
    });
  }

  return (
    <div className="relative">
      <label
        aria-label="add image"
        {...getRootProps()}
        className="cursor-pointer">
        <input
          {...getInputProps({
            name: "image",
          })}
        />
        <div className="gray-bg active:stone-100 flex h-[250px] w-[320px] items-center justify-center rounded-md hover:bg-stone-300 sm:w-[400px]">
          {isDragActive ? (
            <p>Image ready to drop!</p>
          ) : image.loading ? (
            <Spinner width={24} />
          ) : image.preview ? (
            <img
              className="h-full w-full object-cover object-center"
              src={image.preview}
              alt=""
            />
          ) : (
            <div className="grid place-items-center gap-4 text-center">
              <p>
                Drag and drop some image here <br />{" "}
                <span>or click to select</span>
              </p>
              <img src={uploadIcon} alt="" />
            </div>
          )}
        </div>
      </label>
      <p className="text-sm font-light">
        *Image ratio will preserve for the full pet's page
      </p>
      {image.error && <p className="text-red-800">{image.error}</p>}
      {!image.loading && image.preview && (
        <button
          type="button"
          aria-label="remove image"
          onClick={e => {
            e.stopPropagation();
            setImage({ ...image, error: "", preview: "" });
            setNewPet(newPet => {
              return { ...newPet, image: null };
            });
          }}
          className="normal-btn absolute left-2 top-2 flex items-center rounded-[50%] px-[6px] py-[1px] text-sm">
          X
        </button>
      )}
    </div>
  );
}

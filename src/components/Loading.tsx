import loader from "../assets/loader.svg";

export default function Loading({ width = 20 }: { width?: number }) {
  return (
    <img
      className="animate-spin"
      style={{ width: width }}
      src={loader}
      alt="loading"
    />
  );
}

import { ReactNode } from "react";

type SelectProps = {
  optionsList?: string[];
  children?: ReactNode;
  name: string;
  stateValue: string | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};
export default function FitlersSelectInput({
  optionsList,
  name,
  stateValue,
  handleInputChange,
  children,
}: SelectProps) {
  return (
    <select
      name={name}
      value={stateValue || undefined}
      onChange={handleInputChange}
      className="cursor-pointer rounded-lg bg-violet-800 px-1.5 text-center text-stone-100"
    >
      {children
        ? children
        : optionsList?.map(option => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
    </select>
  );
}

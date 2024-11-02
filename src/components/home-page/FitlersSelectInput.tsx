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
      className="cursor-pointer rounded-lg bg-violet-800 px-2 text-center text-stone-100 dark:bg-violet-400 dark:text-neutral-950">
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

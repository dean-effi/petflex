import { FormEvent, useState } from "react";
import { petsType } from "../types";
import { SetURLSearchParams } from "react-router-dom";
import FitlersSelectInput from "./FitlersSelectInput";

type QueryOptionsType = {
  order: "-1" | "1" | null;
  sortBy: string | null;
  petType: petsType | null;
};

type FilterFormProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export default function FiltersForm({
  searchParams,
  setSearchParams,
}: FilterFormProps) {
  const [queryOptions, setQueryOptions] = useState<QueryOptionsType>({
    order: null,
    sortBy: null,
    petType: null,
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    console.log("value", e.target.value);
    setQueryOptions({
      ...queryOptions,
      [e.target.name]: e.target.value,
    });

    return;
  }

  function handleFiltersSubmit(e: FormEvent) {
    e.preventDefault();
    const params: Record<string, string> = {};
    let param: keyof QueryOptionsType;
    for (param in queryOptions) {
      const assign = queryOptions[param];
      if (
        assign != undefined &&
        typeof assign == "string" &&
        !["-1", "all", "date"].includes(assign)
      ) {
        params[param] = assign;
      }
    }

    setSearchParams(params);
  }
  return (
    <form
      className="flex items-center justify-center gap-7 p-2 pt-4 text-lg"
      onSubmit={handleFiltersSubmit}
    >
      filters:
      <label>
        Sort By:
        <FitlersSelectInput
          handleInputChange={handleInputChange}
          name="sortBy"
          optionsList={["date", "likes"]}
          searchParams={searchParams}
          stateValue={queryOptions.sortBy}
        />
      </label>
      <label>
        Pet Type:
        <FitlersSelectInput
          name="petType"
          handleInputChange={handleInputChange}
          stateValue={queryOptions.petType}
          searchParams={searchParams}
          optionsList={[
            "all",
            "dog",
            "cat",
            "rabbit",
            "hamster",
            "lizard",
            "other",
          ]}
        />
      </label>
      <label>
        Order:
        <FitlersSelectInput
          name="order"
          handleInputChange={handleInputChange}
          stateValue={queryOptions.order}
          searchParams={searchParams}
        >
          <option value={-1}>descending</option>
          <option value={1}>ascending</option>
        </FitlersSelectInput>
      </label>
      <button
        type="submit"
        className="rounded-md border border-blue-800 p-1"
      >
        Apply
      </button>
    </form>
  );
}

"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import {
  FetchResults,
  MESSAGE,
  PLACEHOLDER,
  SearchFormValues,
  TAIL,
} from "@/constants";
import { cls } from "@/utils";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchForm = () => {
  const router = useRouter();
  const param = useSearchParams();
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<SearchFormValues>({ mode: "onChange" });
  const [mutate, { loading, data, error }] =
    useMutation<FetchResults>("/search/api");
  const onSubmit: SubmitHandler<SearchFormValues> = (formData) => {
    const url =
      window.location.origin +
      window.location.pathname +
      `?keyword=${formData.search}`;
    router.push(url);
  };
  useEffect(() => {
    const keyword = param.get("keyword");
    setValue("search", keyword as string);
    setFocus("search");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  if (error) console.error(error);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls(TAIL.form)}>
      <div className={cls(TAIL.groupInput)}>
        <label htmlFor="search" className={cls(TAIL.label)}>
          Search
        </label>
        <input
          type="text"
          id="search"
          placeholder={PLACEHOLDER.search}
          className={cls(TAIL.textInput)}
          {...register("search", { required: MESSAGE.search })}
        />
        <p className={cls(TAIL.formError)}>
          {errors.search?.message && errors.search.message}
        </p>
      </div>

      <button type="submit" className={cls(TAIL.button)}>
        {loading ? "Loading..." : "Search"}
      </button>
    </form>
  );
};
export default SearchForm;

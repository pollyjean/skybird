"use client";

import useMutation from "@/libs/client/useMutation";
import { AccountFormValues } from "@/libs/constants";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface MutationResult {
  ok: boolean;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AccountFormValues>({ mode: "onChange" });
  const [mutate, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/enter");
  const onSubmit: SubmitHandler<AccountFormValues> = (formData) => {
    mutate(formData);
  };
  useEffect(() => {
    console.log(data);
    if (!loading && data?.ok === true) {
      redirect("/");
    } else if (!loading && data?.ok === false) {
      setError("password", { message: "Password is incorrect" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);
  if (error) console.error(error);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="relative flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-base-200">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="ex) youremail@domain.com"
          className="rounded-md border border-base-200 bg-base-950 p-3 text-sm placeholder:opacity-40"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter as an email",
            },
          })}
        />
        <p className="absolute right-0 top-0 h-5 text-xs text-red">
          {errors.email?.message && errors.email.message}
        </p>
      </div>

      <div className="relative flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-base-200">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="At least 3 characters"
          className="rounded-md border border-base-200 bg-base-950 p-3 text-sm placeholder:opacity-40"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Enter at least 3 characters",
            },
          })}
        />
        <p className="absolute right-0 top-0 h-5 text-xs text-red">
          {errors.password?.message && errors.password.message}
        </p>
      </div>

      <button type="submit">{loading ? "Loading..." : "Login"}</button>
    </form>
  );
};
export default LoginForm;

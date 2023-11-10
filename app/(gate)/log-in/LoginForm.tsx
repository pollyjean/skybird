"use client";

import useMutation from "@/libs/client/useMutation";
import {
  AccountFormValues,
  FetchResults,
  MESSAGE,
  PATTERN,
  PLACEHOLDER,
  TAIL,
} from "@/constants";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cls } from "@/utils";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AccountFormValues>({ mode: "onChange" });
  const [mutate, { loading, data, error }] =
    useMutation<FetchResults>("/log-in/api");
  const onSubmit: SubmitHandler<AccountFormValues> = (formData) => {
    mutate(formData);
  };
  useEffect(() => {
    if (!loading && data?.ok === true) {
      redirect("/");
    } else if (!loading && data?.message?.type) {
      setError(
        data.message.type,
        { message: data.message.value },
        { shouldFocus: true },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);
  if (error) console.error(error);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls(TAIL.form)}>
      <div className={cls(TAIL.groupInput)}>
        <label htmlFor="email" className={cls(TAIL.label)}>
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder={PLACEHOLDER.email}
          className={cls(TAIL.textInput)}
          {...register("email", {
            pattern: {
              value: PATTERN.email,
              message: MESSAGE.email,
            },
          })}
        />
        <p className={cls(TAIL.formError)}>
          {errors.email?.message && errors.email.message}
        </p>
      </div>

      <div className={cls(TAIL.groupInput)}>
        <label htmlFor="password" className={cls(TAIL.label)}>
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder={PLACEHOLDER.three}
          className={cls(TAIL.textInput)}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: MESSAGE.three,
            },
          })}
        />
        <p className={cls(TAIL.formError)}>
          {errors.password?.message && errors.password.message}
        </p>
      </div>

      <button type="submit" className={cls(TAIL.button)}>
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};
export default LoginForm;

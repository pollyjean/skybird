"use client";

import useMutation from "@/libs/client/useMutation";
import {
  AccountFormValues,
  FetchResults,
  MESSAGE,
  PATTERN,
  PLACEHOLDER,
  REQUIRED,
  TAIL,
} from "@/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { cls } from "@/utils";

const AccountForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({ mode: "onChange" });
  const [mutate, { loading, data, error }] = useMutation<FetchResults>(
    "/create-account/api",
  );
  const onSubmit: SubmitHandler<AccountFormValues> = (formData) => {
    if (formData && formData.password !== formData.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "Enter the same password" },
        { shouldFocus: true },
      );
    } else {
      mutate(formData);
    }
  };
  useEffect(() => {
    if (!loading && data?.ok === true) {
      redirect("/");
    }
    if (!loading && data?.message?.type) {
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
            required: REQUIRED.email,
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
        <label htmlFor="username" className={cls(TAIL.label)}>
          Name
        </label>
        <input
          type="text"
          id="username"
          placeholder={PLACEHOLDER.three}
          className={cls(TAIL.textInput)}
          {...register("username", {
            minLength: {
              value: 3,
              message: MESSAGE.three,
            },
          })}
        />
        <p className={cls(TAIL.formError)}>
          {errors.username?.message && errors.username.message}
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
            required: REQUIRED.password,
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

      <div className={cls(TAIL.groupInput)}>
        <label htmlFor="passwordConfirm" className={cls(TAIL.label)}>
          Password Confirm
        </label>
        <input
          type="password"
          id="passwordConfirm"
          placeholder={PLACEHOLDER.passwordAgain}
          className={cls(TAIL.textInput)}
          {...register("passwordConfirm", { required: REQUIRED.passwordAgain })}
        />
        <p className={cls(TAIL.formError)}>
          {errors.passwordConfirm?.message && errors.passwordConfirm.message}
        </p>
      </div>
      <button type="submit" className={cls(TAIL.button)}>
        {loading ? "Loading..." : "Create Account"}
      </button>
    </form>
  );
};
export default AccountForm;

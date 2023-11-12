"use client";

import {
  AccountFormValues,
  MESSAGE,
  PLACEHOLDER,
  REQUIRED,
  TAIL,
} from "@/constants";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/utils";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const PasswordForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({
    mode: "onChange",
  });
  const [editPassword, { data, error, loading }] = useMutation(
    "/profile/password/api",
  );
  const onSubmit: SubmitHandler<AccountFormValues> = async (formData) => {
    if (formData && formData.newPassword !== formData.passwordConfirm) {
      setError(
        data.message.type,
        { message: MESSAGE.samePassword },
        { shouldFocus: true },
      );
    } else {
      try {
        editPassword({
          password: formData.password,
          newPassword: formData.newPassword,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    if (!loading && data?.ok === true) {
      redirect("/profile");
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
        <label htmlFor="newPassword" className={cls(TAIL.label)}>
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          placeholder={PLACEHOLDER.passwordAgain}
          className={cls(TAIL.textInput)}
          {...register("newPassword", {
            required: REQUIRED.password,
            minLength: { value: 3, message: MESSAGE.three },
          })}
        />
        <p className={cls(TAIL.formError)}>
          {errors.newPassword?.message && errors.newPassword.message}
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
        {loading ? "Loading..." : "Change Password"}
      </button>
    </form>
  );
};

export default PasswordForm;

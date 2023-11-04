"use client";

import { SubmitHandler, useForm } from "react-hook-form";

interface AccountFormValues {
  email: string;
  username: string;
  password: string;
  "password again": string;
}

const AccountForm = () => {
  const { register, handleSubmit } = useForm<AccountFormValues>();
  const onSubmit: SubmitHandler<AccountFormValues> = (data) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email")}
        type="email"
        id="email"
        placeholder="ex) youremail@domain.com"
      />
      <input
        {...register("username")}
        type="text"
        id="username"
        placeholder=""
      />
      <input {...register("password")} type="password" id="" />
      <input {...register("password again")} type="password" id="" />
      <button type="submit">Create Account</button>
    </form>
  );
};
export default AccountForm;

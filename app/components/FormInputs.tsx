import { FormValues } from "@/libs/constants";
import { useFormContext } from "react-hook-form";

function FormInputs() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <>
      <div>
        <label htmlFor="username">Name: </label>
        <input
          {...register("username", {
            required: "Please write down your name.",
          })}
          id="username"
        />
        {errors.username?.message && <span>{errors.username.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          {...register("email", {
            required: "Please write down your email.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@naver\.com$/,
              message: "Only @naver emails allowed",
            },
          })}
          type="email"
          id="email"
          placeholder="Only @naver.com"
        />
        {errors.email?.message && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          {...register("password", {
            required: "Please write down your password.",
            minLength: {
              value: 10,
              message: "Password has to be more than 10 chars",
            },
          })}
          type="password"
          id="password"
          placeholder="Min 10 characters"
        />
        {errors.password?.message && <span>{errors.password.message}</span>}
      </div>
    </>
  );
}

export default FormInputs;

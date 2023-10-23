"use client";

import FormInput from "@/components/FormInput";
import { FormValues } from "@/libs/constants";
import { FormProvider, useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit()}>
        <FormInput />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default Form;

"use client";

import FormInputs from "@/components/FormInputs";
import { FormValues } from "@/libs/constants";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

function Form() {
  const [message, setMessage] = useState("");
  const methods = useForm<FormValues>({ mode: "onChange" });
  const onSubmit: SubmitHandler<FormValues> = () => {
    setMessage("Thank you");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInputs />
        <button type="submit">Log in</button>
        {message.length > 0 && <div>{message}</div>}
      </form>
    </FormProvider>
  );
}

export default Form;

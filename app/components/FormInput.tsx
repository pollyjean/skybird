import { FormValues } from "@/libs/constants";
import { useFormContext } from "react-hook-form";

const FormInput = () => {
  const { register } = useFormContext<FormValues>();
  return (
    <div>
      <input
        type="email"
        placeholder="E-Mail"
        {...register("E-Mail", { required: true })}
      />
      <input
        type="text"
        placeholder=""
    </div>
  );
};

export default FormInput;

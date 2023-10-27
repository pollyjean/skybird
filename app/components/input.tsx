import { EnterForms } from "@/libs/client/constants";
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  type: "email" | "text" | "number";
  kind?: "text" | "phone" | "price";
  pattern?: string;
  required?: string | true | false;
  placeholder?: string;
}

export default function Input({
  name,
  label,
  type,
  kind = "text",
  pattern,
  required,
  placeholder,
}: InputProps) {
  const { register } = useFormContext<EnterForms>();
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      {kind === "text" ? (
        <div className="relative flex items-center rounded-md shadow-sm">
          <input
            id={name}
            type={type}
            {...register("email", { required: required })}
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </div>
      ) : null}
      {kind === "price" ? (
        <div className="relative flex items-center  rounded-md shadow-sm">
          <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
            <span className="text-sm text-gray-500">$</span>
          </div>
          <input
            id={name}
            type={type}
            {...register("phone", { required: required })}
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
          <div className="pointer-events-none absolute right-0 flex items-center pr-3">
            <span className="text-gray-500">KRW</span>
          </div>
        </div>
      ) : null}
      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            +82
          </span>
          <input
            id={name}
            type={type}
            pattern={pattern}
            {...register("phone", {
              pattern: {
                value: /^((01\d{1})|([2-9]\d{1,2}))\d{3,4}\d{4}$/,
                message: "Enter phone number",
              },
              required: required,
            })}
            className="w-full appearance-none rounded-md rounded-l-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </div>
      ) : null}
    </div>
  );
}

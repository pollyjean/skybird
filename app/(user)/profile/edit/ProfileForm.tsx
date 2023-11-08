"use client";

import { AccountFormValues } from "@/libs/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ProfileForm = () => {
  const [preview, setPreview] = useState("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({ mode: "onChange" });
  const onSubmit: SubmitHandler<AccountFormValues> = async (formData) => {
    if (formData.avatar && formData.avatar.length > 0) {
      const { uploadURL } = await (
        await fetch(`/api/files`, { method: "POST" })
      ).json();
      const form = new FormData();
      form.append("file", formData.avatar[0], `avatar-${Date.now()}`);
      const { result: id } = await (
        await fetch(uploadURL, { method: "POST", body: form })
      ).json();
      console.log(id);
      return;
    }
  };

  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="relative flex flex-col gap-1">
        <label htmlFor="avatar" className="text-sm font-medium text-base-200">
          Profile Image
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          className="rounded-md border border-base-200 bg-base-950 p-3 text-sm placeholder:opacity-40"
          {...register("avatar")}
        />
        <figure>
          <Image
            src={preview ? preview : "/transparent.png"}
            width={100}
            height={100}
            alt="Avatar Preview"
            priority={true}
            className="h-14 w-14 rounded-full object-cover ring-1 ring-base-500"
          />
        </figure>
        <p className="absolute right-0 top-0 h-5 text-xs text-red">
          {errors.avatar?.message && errors.avatar.message}
        </p>
      </div>

      <button type="submit">Preview</button>
    </form>
  );
};
export default ProfileForm;

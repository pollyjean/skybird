"use client";

import { AccountFormValues, MESSAGE, PLACEHOLDER, TAIL } from "@/constants";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ProfileForm = ({ sessionId }: { sessionId: number }) => {
  const [preview, setPreview] = useState("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({ mode: "onChange" });
  const [editProfile, { data }] = useMutation(`/user/${sessionId}/edit`);
  const onSubmit: SubmitHandler<AccountFormValues> = async (formData) => {
    if (formData.avatar) {
      const { uploadURL } = await (
        await fetch("/cloudflare", { method: "POST" })
      ).json();
      const form = new FormData();
      form.append("file", formData.avatar as Blob, `avatar-${Date.now()}`);
      const { result: data } = await (
        await fetch(uploadURL, { method: "POST", body: form })
      ).json();
      editProfile({ avatar: data.id });
      return;
    }
  };

  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar) {
      setPreview(URL.createObjectURL(avatar as Blob));
    }
  }, [avatar]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className={cls(TAIL.groupInput)}>
        <label htmlFor="email" className={cls(TAIL.label)}>
          Email
        </label>
        <input
          type="email"
          id="email"
          readOnly={true}
          placeholder={PLACEHOLDER.email}
          className={cls(TAIL.textInput)}
          {...register("email", {
            required: true,
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

      <div className={cls(TAIL.groupInput)}>
        <label htmlFor="profile" className={cls(TAIL.label)}>
          Profile Introduction
        </label>
        <textarea
          id="text"
          className={cls(TAIL.textInput)}
          {...register("profile")}
        ></textarea>
        <p className={cls(TAIL.formError)}>
          {errors.profile?.message && errors.profile.message}
        </p>
      </div>

      <button type="submit">Preview</button>
    </form>
  );
};
export default ProfileForm;

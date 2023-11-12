"use client";

import {
  AccountFormValues,
  FetchResults,
  MESSAGE,
  PLACEHOLDER,
  ProfileProps,
  TAIL,
} from "@/constants";
import useMutation from "@/libs/client/useMutation";
import { cls, generateImageUrl, postFetcher } from "@/utils";
import Image from "next/image";
import { RedirectType, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

const ProfileForm = () => {
  const {
    data: beforeData,
    error: beforeError,
    isLoading: beforeIsLoading,
  } = useSWR<FetchResults>("/profile/api", postFetcher);
  const [preview, setPreview] = useState<FileList | Blob | string>();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({ mode: "onChange" });
  const [
    editProfile,
    { data: afterData, error: afterError, loading: afterIsLoading },
  ] = useMutation(`/profile/edit/api`);
  const onSubmit: SubmitHandler<AccountFormValues> = async (formData) => {
    try {
      if (
        formData.avatar &&
        formData.avatar[0] &&
        typeof formData.avatar === "object"
      ) {
        const { uploadURL } = await (
          await fetch("/api/cloudflare", { method: "POST" })
        ).json();
        const form = new FormData();
        const file = formData.avatar[0];
        form.append("file", file, `avatar-${Date.now()}`);
        const { result: data } = await (
          await fetch(uploadURL, { method: "POST", body: form })
        ).json();
        editProfile({
          email: formData.email,
          username: formData.username ? formData.username : "anonymous",
          avatar: data.id,
          profile: formData.profile ? formData.profile : null,
        });
      } else {
        editProfile({
          email: formData.email,
          username: formData.username ? formData.username : "anonymous",
          profile: formData.profile ? formData.profile : null,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar[0] && typeof avatar === "object") {
      const file = avatar[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else if (!beforeIsLoading && beforeData?.data.avatar) {
      const url = generateImageUrl(beforeData.data.avatar, "profileImage");
      setPreview(url);
    }
  }, [avatar, beforeData?.data, beforeIsLoading]);

  useEffect(() => {
    if (!beforeIsLoading && beforeData?.data) {
      setValue("email", beforeData.data.email);
      beforeData.data.username &&
        setValue("username", beforeData.data.username);
      beforeData.data.avatar && setValue("avatar", beforeData.data.avatar);
      beforeData.data.profile && setValue("profile", beforeData.data.profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beforeIsLoading, beforeData?.data]);

  useEffect(() => {
    if (!afterIsLoading && afterData?.ok) {
      redirect("/profile", RedirectType.replace);
    }
  }, [afterIsLoading, afterData]);
  if (beforeError) console.error(beforeError);
  if (afterError) console.error(afterError);
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
          className={cls(TAIL.textInput, "text-base-500 focus:outline-none")}
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

      <div className={cls(TAIL.groupInput)}>
        <label htmlFor="avatar" className={cls(TAIL.label)}>
          Profile Image
        </label>
        <div className="grid grid-cols-4 gap-2">
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="bg-base-250 col-span-3 h-[134px] grow rounded-md border border-base-200 p-3 text-sm placeholder:opacity-40"
            {...register("avatar")}
          />
          <figure className="flex aspect-square w-[134px] items-stretch justify-center overflow-hidden rounded-md border-2 border-dashed border-base-200">
            {preview ? (
              <Image
                src={
                  preview ? (preview as unknown as string) : "/transparent.png"
                }
                alt="Image Preview"
                className="object-cover object-center"
                {...ProfileProps}
              />
            ) : (
              <div className="h-14 w-14 rounded-md object-cover"></div>
            )}
          </figure>
        </div>
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

      <button type="submit">
        {afterIsLoading ? "loading..." : "Change Profile"}
      </button>
    </form>
  );
};
export default ProfileForm;

"use client";

import { FetchResults, PageProps, TAIL, TweetFormValues } from "@/constants";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const TweetForm = ({ userId }: PageProps) => {
  const [preview, setPreview] = useState("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TweetFormValues>({ mode: "onChange" });
  const [mutate, { loading, data, error }] =
    useMutation<FetchResults>("/new/api");
  const onSubmit: SubmitHandler<TweetFormValues> = async (formData) => {
    if (formData.image && formData.image.length > 0) {
      const { uploadURL } = await (
        await fetch("/api/cloudflare", { method: "POST" })
      ).json();
      const form = new FormData();
      form.append("file", formData.image[0], `postImage-${formData.id}`);
      const { result: data } = await (
        await fetch(uploadURL, { method: "POST", body: form })
      ).json();
      mutate({ userId, text: formData.text, image: data.id });
    } else {
      mutate({ userId, text: formData.text });
    }
  };
  const image = watch("image");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [image]);

  useEffect(() => {
    if (!loading && data?.tweetId) {
      redirect(`/post/${data.tweetId}`);
    }
  }, [loading, data]);
  if (error) console.error(error);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls(TAIL.form)}>
      <div className={cls(TAIL.groupInput)}>
        <label htmlFor="text" className={cls(TAIL.label)}>
          Text
        </label>
        <textarea
          id="text"
          placeholder="What's up today?"
          className={cls(TAIL.textInput)}
          {...register("text", {
            required: "Please enter the content",
          })}
        ></textarea>
        <p className={cls(TAIL.formError)}>
          {errors.text?.message && errors.text.message}
        </p>
      </div>
      <div className={cls(TAIL.groupInput)}>
        <label htmlFor="image" className={cls(TAIL.label)}>
          Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="rounded-md border border-base-200 bg-base-950 p-3 text-sm placeholder:opacity-40"
          {...register("image")}
        />
        <figure>
          <Image
            src={preview ? preview : "/transparent.png"}
            width={100}
            height={100}
            alt="Image Preview"
            priority={true}
            className="h-14 w-14 rounded-md object-cover"
          />
        </figure>
        <p className={cls(TAIL.formError)}>
          {errors.image?.message && errors.image.message}
        </p>
      </div>

      <button type="submit" className={cls(TAIL.button)}>
        {loading ? "Loading..." : "Post Content"}
      </button>
    </form>
  );
};
export default TweetForm;

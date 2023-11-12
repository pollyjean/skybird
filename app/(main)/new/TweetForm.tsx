"use client";

import { FetchResults, ImageProps, TAIL, TweetFormValues } from "@/constants";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const TweetForm = () => {
  const [preview, setPreview] = useState<FileList | string>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TweetFormValues>({ mode: "onChange" });
  const [mutate, { loading, data, error }] =
    useMutation<FetchResults>("/new/api");
  const onSubmit: SubmitHandler<TweetFormValues> = async (formData) => {
    if (formData.image) {
      const { uploadURL } = await (
        await fetch("/api/cloudflare", { method: "POST" })
      ).json();
      const form = new FormData();
      form.append(
        "file",
        formData.image[0] as Blob,
        `postImage-${formData.id}`,
      );
      const { result: data } = await (
        await fetch(uploadURL, { method: "POST", body: form })
      ).json();
      mutate({ text: formData.text, image: data.id });
    } else {
      mutate({ text: formData.text });
    }
  };
  const image = watch("image");
  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image[0] as Blob));
    }
  }, [image]);

  useEffect(() => {
    if (!loading && data?.tweetId) {
      redirect(`/tweet/${data.tweetId}`);
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
          className={cls(TAIL.fileInput)}
          {...register("image")}
        />
        <figure className="my-5 w-full border-2 border-dashed border-base-200">
          {preview ? (
            <Image
              src={
                preview ? (preview as unknown as string) : "/transparent.png"
              }
              alt="Image Preview"
              className="rounded-md object-cover"
              {...ImageProps}
            />
          ) : (
            <div className="h-14 w-14 rounded-md object-cover"></div>
          )}
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

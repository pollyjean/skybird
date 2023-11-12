"use client";

import { FetchResults, ImageProps, TAIL, TweetFormValues } from "@/constants";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const TweetForm = () => {
  const [preview, setPreview] = useState<FileList | Blob | string>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TweetFormValues>({ mode: "onChange" });
  const [mutate, { loading, data, error }] =
    useMutation<FetchResults>("/new/api");
  const onSubmit: SubmitHandler<TweetFormValues> = async (formData) => {
    try {
      if (
        formData.image &&
        formData.image[0] &&
        typeof formData.image === "object"
      ) {
        const { uploadURL } = await (
          await fetch("/api/cloudflare", { method: "POST" })
        ).json();
        const form = new FormData();
        const file = formData.image[0];
        form.append("file", file, `postImage-${formData.id}`);
        const { result: data } = await (
          await fetch(uploadURL, { method: "POST", body: form })
        ).json();
        mutate({ text: formData.text, image: data.id });
      } else {
        mutate({ text: formData.text });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const image = watch("image");
  useEffect(() => {
    if (image && image[0] && typeof image === "object") {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
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
            <div className="flex items-center justify-center rounded-md object-cover p-5 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 stroke-orange-light"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
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

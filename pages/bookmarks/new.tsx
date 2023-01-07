import { Inter } from "@next/font/google";
import React, { ReactElement, useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
import { CreateBookmarkDto } from "../../types/bookmarks/dto";
import { Layout } from "../../components/layouts/layout";
import { useRouter } from "next/router";
import baseUrl from "../../baseUrl/base";

// interface IFormInput {
//   email: string;
//   hash: string;
//   firstName: string;
//   lastName: string;
//   role: "user";
// }

const NewBookmark = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, formState, reset } =
    useForm<CreateBookmarkDto>();

  const mutation: any = useMutation((newBookmark) => {
    return axios
      .post(`https://bookmarky-backend.onrender.com/bookmarks/create`, newBookmark, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        router.push('/')
        // sessionStorage.setItem('session_id', JSON.stringify(res.data.sessionId))
      })
      .catch((err) => {
        return err;
      });
  });

  const onSubmit: SubmitHandler<CreateBookmarkDto> = (data: any) => {
    console.log(data);
    mutation.mutate({
      ...data,
    });
  };
  let loadingToastId: string | undefined;
  useEffect(() => {
    if (mutation.isLoading) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      loadingToastId = toast.loading("Creating...");
    } else {
      toast.dismiss(loadingToastId);
    }
    if (mutation.isSuccess) {
      toast.success("Bookmark Created!");
    } else if (mutation.isError) {
      toast.error(mutation.error);
    }
  }, [
    mutation.isSuccess,
    mutation.isError,
    mutation.error,
    mutation.isLoading,
  ]);

  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <Toaster />
      <div className="w-full max-w-sm">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-xl font-bold mb-5 text-gray-700">
            New Fling Bookmark!
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <label className="text-gray-700" htmlFor={"title"}>
              Title
            </label>
            <input
              type={"text"}
              autoCapitalize={"title"}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("title", { required: true })}
            />
            {formState.errors.title && (
              <span className="text-red-500">This field is required</span>
            )}
            <label className="text-gray-700" htmlFor={"description"}>
              Description(optional)
            </label>
            <textarea
              id="description"
              autoCorrect="description"
              aria-autocomplete="inline"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("description", { required: false })}
              name="description"
            />
            <label className="text-gray-700" htmlFor="link">
              Link
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("link", { required: true })}
              type={"url"}
              autoComplete={"link"}
              name={"link"}
              id={"link"}
            />
            {formState.errors.link && (
              <span className="text-red-500">This field is required</span>
            )}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


NewBookmark.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default NewBookmark
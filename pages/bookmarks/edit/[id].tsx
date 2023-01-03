import { Inter } from "@next/font/google";
import React, { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
import { EditBookmarkDto } from "../../../types/bookmarks/dto";
import { useRouter } from "next/router";
import { Layout } from "../../../components/layouts/layout";

// interface IFormInput {
//   email: string;
//   hash: string;
//   firstName: string;
//   lastName: string;
//   role: "user";
// }

function EditBookmark() {
  const { register, handleSubmit, watch, formState, reset } =
    useForm<EditBookmarkDto>();
  const router = useRouter();
  const { id } = router.query;
  const mutation: any = useMutation((newBookmark) => {
    return axios
      .patch(`https://bookmarky-backend-production.up.railway.app/bookmarks/edit/${id}`, newBookmark, {
        headers: {
          Origin: "https://bookmarky-frontend.vercel.app/",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        router.push(`/bookmarks/${id}`);
        // sessionStorage.setItem('session_id', JSON.stringify(res.data.sessionId))
      })
      .catch((err) => {
        return err;
      });
  });

  const fetchData = async () => {
    const response = await axios.get(`https://bookmarky-backend-production.up.railway.app/bookmarks/${id}`, {
      withCredentials: true,
    });
    return response.data;
  };

  const { data, isLoading, error } = useQuery("bookmarkById", fetchData);
  const onSubmit: SubmitHandler<EditBookmarkDto> = (data: any) => {
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
      toast.success("Bookmark Edited!");
    } else if (mutation.isError) {
      toast.error(mutation.error);
    }
  }, [
    mutation.isSuccess,
    mutation.isError,
    mutation.error,
    mutation.isLoading,
  ]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: </div>;
  }

  return (
    <div className="container mx-auto h-screen flex justify-center">
      <Toaster />
      <div className="w-full max-w-sm">
        <div className="bg-white shadow-md rounded px-8  pb-8 mb-4">
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
              defaultValue={data ? `${data.title}`: ""}
              {...register("title", { required: false })}
            />
            {formState.errors.title && (
              <span className="text-red-500">This field is required</span>
            )}
            <label className="text-gray-700" htmlFor={"description"}>
              Description
            </label>
            <textarea
              id="description"
              autoCorrect="description"
              aria-autocomplete="inline"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-44"
              defaultValue={data ? `${data.description}`: ""}
              {...register("description", { required: false })}
              name="description"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

EditBookmark.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditBookmark;

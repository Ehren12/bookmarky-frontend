import { Inter } from "@next/font/google";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
import {LoginDto} from '../../types/authtypes/'
import { useRouter } from "next/router";


export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState, reset } =
    useForm<LoginDto>();

  const mutation: any = useMutation((newUser) => {
    return axios
      .post("https://bookmarky-backend-production.up.railway.app/auth/login", newUser, {
        headers: {
          Origin: "https://bookmarky-frontend.vercel.app/",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        router.push('/')
        // sessionStorage.setItem('session_id', JSON.stringify(res.data.sessionId))
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          throw "Incorrect credentials!";
        }
        if (err.response.status === 500) {
          throw "Password seems incorrect!";
        }
      });
  });

  const onSubmit: SubmitHandler<LoginDto> = async (data: any) => {
    console.log(data);
    await mutation.mutate({
      ...data,
    });
  };
  let loadingToastId: string | undefined;
  useEffect(() => {
    if (mutation.isLoading) {
      loadingToastId = toast.loading("Verifying");
    } else {
      toast.dismiss(loadingToastId);
    }
    if (mutation.isSuccess) {
      toast.success("Yay! Your Back!");
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
            Login to your Lings Account
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <label className="text-gray-700">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("username", { required: true })}
              type={"email"}
              autoComplete={"username"}
              name={"username"}
              id={"username"}
            />
            {formState.errors.username && (
              <span className="text-red-500">This field is required</span>
            )}
            <label className="text-gray-700">Password</label>
            <input
              id={"current-password"}
              type={"password"}
              autoComplete={"current-password"}
              aria-describedby="password-constraints"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("password", { required: true })}
              name="password"
            />
            {formState.errors.password && (
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

// export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
//   context
// ) => {
//   const res = await fetch("http:/");
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// };

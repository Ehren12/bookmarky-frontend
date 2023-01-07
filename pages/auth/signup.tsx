import { Inter } from "@next/font/google";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
import {SignupDto} from '../../types/authtypes/'
import { useRouter } from "next/router";
import baseUrl from "../../baseUrl/base";

// interface IFormInput {
//   email: string;
//   hash: string;
//   firstName: string;
//   lastName: string;
//   role: "user";
// }

export default function Signup() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState, reset } =
    useForm<SignupDto>();

  const mutation: any = useMutation((newUser) => {
    return axios
      .post(`https://bookmarky-backend.onrender.com/auth/signup`, newUser, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        router.push('/auth/login')
        // sessionStorage.setItem('session_id', JSON.stringify(res.data.sessionId))
      })
      .catch((err) => {
        return err;
      });
  });

  const onSubmit: SubmitHandler<SignupDto> = (data: any) => {
    console.log(data);
    mutation.mutate({
      ...data,
    });
  };
  let loadingToastId: string | undefined;
  useEffect(() => {
    if (mutation.isLoading) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      loadingToastId = toast.loading("Verifying");
    } else {
      toast.dismiss(loadingToastId);
    }
    if (mutation.isSuccess) {
      toast.success("Account Created!");
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
            Create your Lings account!
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <label className="text-gray-700">First name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("firstName", { required: true })}
            />
            {formState.errors.firstName && (
              <span className="text-red-500">This field is required</span>
            )}
            <label className="text-gray-700">Last name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("lastName", { required: true })}
            />
            {formState.errors.lastName && (
              <span className="text-red-500">This field is required</span>
            )}
            <label className="text-gray-700">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("email", { required: true })}
              type={"email"}
              autoComplete={"username"}
              name={"email"}
              id={"username"}
            />
            {formState.errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
            <label className="text-gray-700">Password</label>
            <input
              id={"new-password"}
              type={"password"}
              autoComplete={"new-password"}
              aria-describedby={"password-constraints"}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("hash", { required: true, minLength: 12 })}
              name={"hash"}
            />
            {formState.errors.hash && (
              <span className="text-red-500">This field is required</span>
            )}
            <label className="text-gray-700">Role</label>
            <select
              {...register("role")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="user">User</option>
            </select>
            {formState.errors.role && (
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

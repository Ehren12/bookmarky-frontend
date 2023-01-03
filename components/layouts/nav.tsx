import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";

export const Nav = () => {
  const isAuthenticated = async () => {
    const response = await axios.get(
      "https://bookmarky-backend-production.up.railway.app/auth/isAuthenticated",
      {
        headers: {
          Origin: "https://bookmarky-frontend.vercel.app/",
        },
        withCredentials: true,
      }
    );
    return response.data;
  };
  const {
    data = false,
    isLoading,
    error,
    refetch,
  } = useQuery("data", isAuthenticated);

  const logout = async () => {
    axios
      .get("https://bookmarky-backend-production.up.railway.app/auth/logout", {
        withCredentials: true,
      })
      .then(() => refetch())
      .catch((err) => {
        console.error(err);
      });
  };

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {data === true ? (
        <ul className="bg-white flex flex-row mb-3 px-4 md:px-12 fixed py-3 shadow-sm w-screen h-16 overflow-y-hidden">
          <li className="mr-3 ">
            <Link
              href="/"
              className="flex flex-row justify-center border border-blue-500 rounded w-20 py-2  px-3  bg-blue-500 text-white"
            >
              Links
            </Link>
          </li>
          <li className="mr-3">
            <Link
              className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3"
              href="/bookmarks/new"
            >
              Create
            </Link>
          </li>
          <li className="mr-3">
            <Link
              className="inline-block py-1 px-3 text-gray-400 cursor-not-allowed"
              href="#"
            >
              Explore
            </Link>
          </li>
          <li className="md:ml-auto">
            <Link
              className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3"
              href="#"
              onClick={logout}
            >
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex mb-3 px-4 py-3 shadow-sm w-screen h-16 overflow-hidden">
          <li className="mr-3">
            <Link
              href="/auth/signup"
              className="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
            >
              Signup
            </Link>
          </li>
          <li className="mr-3">
            <Link
              className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3"
              href="/auth/login"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

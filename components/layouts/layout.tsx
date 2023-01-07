import axios from "axios";
import { Nav } from "./nav";
import { useQuery } from "react-query";
import Link from "next/link";
import baseUrl from "../../baseUrl/base";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = async () => {
    const response = await axios.get(
      `https://bookmarky-backend.onrender.com/auth/isAuthenticated`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  };
  const { data = false, isLoading, error } = useQuery("data", isAuthenticated);
  console.log(data)
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col">
        <Nav />
        {data === true ? (
          <main className="pt-6 h-fit px-10 mt-24">{children}</main>
        ) : (
          <div className="py-6 px-10 mt-18"><h1 className="text-lg font-bold">You need to <Link href={'/auth/login'} className="text-centre text-blue-500 underline hover:text-blue-600">login</Link></h1></div>
        )}
      </div>
    </>
  );
};

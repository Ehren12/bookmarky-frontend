import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { Layout } from "../../components/layouts/layout";
import { ReactElement } from "react";
import Link from "next/link";
import { Pencil, Trash } from "phosphor-react";
const SingleBookmark = () => {
  const router = useRouter();
  const { id } = router.query;
  const fetchData = async () => {
    const response = await axios.get(`https://bookmarky-backend-production.up.railway.app/bookmarks/${id}`, {
      headers: {
        Origin: "https://bookmarky-frontend.vercel.app",
      },
      withCredentials: true,
    });
    return response.data;
  };
  const { data, isLoading, error, refetch } = useQuery("bookmarkById", fetchData);
  const deleteBookmark = async () => {
    axios
      .delete(`https://bookmarky-backend-production.up.railway.app/bookmarks/delete/${id}`, {
        withCredentials: true,
      })
      .then(() => router.push('/'))
      .catch((err) => {
        console.error(err);
      });
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: </div>;
  }

  return (
    <div className="container mx-auto m-20 flex justify-center">
      <div className="p-10 flex flex-col w-4/5 max-w-md h-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold mb-5 text-gray-700">
            {data.title}
          </h1>{" "}
          <Link
            href={`/bookmarks/edit/${data.id}`}
            className="hover:bg-gray-50 h-fit p-1.5 rounded"
          >
            <Pencil size={24} />
          </Link>
        </div>
        <p className="text-md text-gray-700 mb-3">{data?.description}</p>
        <div className="flex justify-end mt-auto space-x-2">
          <Link
            href="#delete"
            onClick={deleteBookmark}
            className="hover:bg-gray-50 h-fit p-1.5 rounded text-red-600"
          >
            <Trash size={24} weight="light" />
          </Link>
          <a
            className="text-white p-2 bg-blue-600 w-20 rounded-md md:w-32 flex flex-row justify-center "
            href={`${data.link}`}
          >
            Visit Link
          </a>
        </div>
      </div>
    </div>
  );
};

SingleBookmark.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SingleBookmark;

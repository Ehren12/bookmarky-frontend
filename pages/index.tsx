import { useQuery } from "react-query";
import axios from "axios";
import { BookmarkTypes } from "../types/bookmarks/interface";
import { ReactElement } from "react";
import { Layout } from "../components/layouts/layout";
import Link from "next/link";
import BookmarkCard from "../components/generalComponents/bookmarkCard";

const fetchBookmarks = async () => {
  const response = await axios.get("https://bookmarky-backend-production.up.railway.app/bookmarks", {
    headers: {
      Origin: "https://bookmarky-frontend.vercel.app/",
    },
    withCredentials: true,
  });
  return response.data;
};

const Home = () => {
  const { data, isLoading, error } = useQuery("bookmarks", fetchBookmarks);
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="flex flex-col space-y-10 container mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Your Bookmarks</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:p-2 overflow-y-hidden overscroll-none">
        {Array.isArray(data) ? (
          data.map((item: BookmarkTypes) => <div key={item.id}><BookmarkCard bookmark={item}/></div>)
        ) : (
          <div>Nothing to see here</div>
        )}
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

import Link from "next/link";
export default function BookmarkCard(bookmark: any) {
  const item = bookmark.bookmark
  return (
    <div className="flex flex-col justify-left p-4 rounded-md shadow-md h-full space-y-4">
      <Link href={`/bookmarks/${bookmark.id}`}>
        <h1 className="text-2xl font-bold text-gray-700 hover:underline">
          {bookmark && item.title && item.title.substring(0, 10)}
          {bookmark && item.title && item.title.length > 10
            ? "..."
            : ""}
        </h1>
      </Link>
      <p className="text-md text-gray-500 h-1/2">
        {bookmark &&
          item.description &&
          item.description.substring(0, 65)}
        {bookmark &&
        item.description &&
        item.description.length > 65 ? (
          <>
            {" "}
            <Link
              href={`/bookmarks/${item.id}`}
              className="underline text-blue-400"
            >
              View more
            </Link>
          </>
        ) : (
          ""
        )}
      </p>
      <div className="flex justify-end mt-auto mr-auto">
        <a
          href={`${item.link}`}
          className="text-white p-2 bg-blue-600 w-20 rounded-md md:w-22 flex flex-row justify-left "
        >
          Visit Link
        </a>
      </div>
    </div>
  );
}

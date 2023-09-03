import { getFullURL } from "@/utils/getFullURL";
import { Post } from "@prisma/client";
import { notFound } from "next/navigation";
import { PostItem } from "@/components/PostItem";
import axios from "axios";

export default async function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const searchQuery = searchParams.q;

  if (!searchQuery || searchQuery.length <= 0) return notFound();

  const searchResults = await searchPost(searchQuery);

  return (
    <div className="p-4 py-8 md:p-8 md:py-12">
      {searchResults ? (
        <>
          <h1 className="mb-8 text-center text-2xl">
            Found {searchResults.length} results for{" "}
            <strong>{searchQuery}</strong>
          </h1>
          <div className="grid grid-cols-1 gap-8  sm:grid-cols-2 lg:grid-cols-3 ">
            {searchResults.map((post) => {
              return <PostItem key={post.id} post={post} />;
            })}
          </div>
        </>
      ) : (
        <h1 className="text-center text-2xl">
          No results found for <strong>&quot;{searchQuery}&quot;</strong>
        </h1>
      )}
    </div>
  );
}

async function searchPost(searchQuery: string): Promise<Post[] | null> {
  try {
    const res = await axios.get(getFullURL(`/api/search?q=${searchQuery}`));

    if (res.data.count === 0) throw Error("No results found.");

    return res.data.posts;
  } catch (error) {
    console.log(error);
    return null;
  }
}

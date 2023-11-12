"use client";

import Tweet from "@/components/Tweet";
import { FetchResults, TAIL, TweetFormValues } from "@/constants";
import useMutation from "@/libs/client/useMutation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const [results, setResults] = useState<any | string>();
  const param = useSearchParams();
  const keyword = param.get("keyword");
  const [mutate, { loading, data, error }] =
    useMutation<FetchResults>("/search/api");

  useEffect(() => {
    if (keyword) {
      mutate(keyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  useEffect(() => {
    if (!loading && data?.message?.value) {
      setResults(data.message.value);
    }
    if (!loading && data?.data) {
      setResults(data.data);
    }
  }, [data, loading]);
  if (error) console.error(error);
  return (
    <section className="flex flex-col gap-5">
      {results && !(typeof results === "string") && (
        <article>
          <h2>Search Results : &ldquo;{keyword}&rdquo;</h2>
          <ul className="flex flex-col border-b-2 border-orange-light">
            {results?.map((tweet: TweetFormValues) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </ul>
        </article>
      )}
      {results && typeof results === "string" && <p>{results}</p>}
    </section>
  );
};

export default SearchResults;

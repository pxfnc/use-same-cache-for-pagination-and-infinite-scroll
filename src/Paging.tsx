import { ReactNode, useState } from "react";
import useSWR from "swr";
import { fetchEntries } from "./api";

async function fetcher<Query extends string>(arg: Query) {
  const url = new URL(arg, window.origin);
  const page = parseInt(url.searchParams.get("page") ?? "", 10);
  return fetchEntries(page);
}

export default function Paging(): ReactNode {
  const [page, setPage] = useState<number>(1);

  const { data, error, isLoading, isValidating } = useSWR(
    `/api/entries?page=${page}`,
    fetcher,
    { revalidateIfStale: false, keepPreviousData: true }
  );

  if (error) return <div>failed to load</div>;

  return (
    <section className="p-4 flex flex-col gap-2">
      <h2 className="font-bold text-3xl">paging</h2>
      <p>isLoading: {isLoading.toString()}</p>
      <p>isValidating: {isValidating.toString()}</p>
      <div className="flex gap-4 w-3/12 justify-between">
        {page > 1 && (
          <button className="text-blue-600" onClick={() => setPage((prev) => prev - 1)}>prev</button>
        )}
        <button className="text-blue-600" onClick={() => setPage((prev) => prev + 1)}>next</button>
      </div>
      {data != null && (
        <>
          <ul>
            {data?.entries.map((entry) => {
              return <li key={entry.id}>{entry.name}</li>;
            })}
          </ul>
          <div>total {data.total}</div>
        </>
      )}
    </section>
  );
}

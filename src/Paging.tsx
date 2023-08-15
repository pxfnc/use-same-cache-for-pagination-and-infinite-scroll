import { ComponentProps, ReactNode, useState } from "react";
import useSWR from "swr/immutable";
import { entriesFetcher } from "./api";
import Entries from "./Entries";
import clsx from "clsx";

const offset = 20;

export default function Paging(props: ComponentProps<"section">): ReactNode {
  const [page, setPage] = useState<number>(0);

  const { data, error, isLoading, isValidating } = useSWR(
    `/api/entries?offset=${offset}&page=${page}`,
    entriesFetcher,
    { keepPreviousData: true }
  );

  if (error) return <div>failed to load</div>;

  return (
    <section
      {...props}
      className={clsx("flex flex-col gap-2", props.className)}
    >
      <h2 className="font-bold text-3xl">paging</h2>
      <p>isLoading: {isLoading.toString()}</p>
      <p>isValidating: {isValidating.toString()}</p>
      {data != null && (
        <div>
          <Entries entries={data.entries} aria-busy={isValidating} />
          <div className="grid grid-cols-3">
            {page > 0 && (
              <button
                className="text-blue-600 col-start-1 place-self-center disabled:text-gray-600"
                onClick={() => setPage((idx) => idx - 1)}
                disabled={isValidating}
              >
                prev
              </button>
            )}
            <span className="col-start-2 place-self-center">
              {offset * page + 1} ~ {offset * (page + 1)} / {data.total}
            </span>
            {offset * (page + 1) < data.total && (
              <button
                className="text-blue-600 col-start-3 place-self-center disabled:text-gray-600"
                onClick={() => setPage((idx) => idx + 1)}
                disabled={isValidating}
              >
                next
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

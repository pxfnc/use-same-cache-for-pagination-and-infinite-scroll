import { ComponentProps, ReactNode } from "react";
import useSWRInfinite from "swr/infinite";
import { entriesFetcher } from "./api";
import Entries from "./Entries";
import clsx from "clsx";

const offset = 20;

function getKey(
  pageIndex: number,
  previousPageData: undefined | Awaited<ReturnType<typeof entriesFetcher>>
) {
  if (previousPageData && previousPageData.total <= pageIndex * offset)
    return null;
  return `/api/entries?offset=${offset}&page=${pageIndex}` as const;
}

export default function Infinite(props: ComponentProps<"section">): ReactNode {
  const { data, error, isLoading, isValidating, setSize, size } =
    useSWRInfinite(getKey, entriesFetcher, {
      revalidateAll: false,
      revalidateFirstPage: false,
    });

  if (error) return <div>failed to load</div>;

  const entries = data?.flatMap((d) => d.entries);
  const total = data?.[0].total;

  return (
    <section
      {...props}
      className={clsx("flex flex-col gap-2", props.className)}
    >
      <h2 className="font-bold text-3xl">infinite</h2>
      <p>isLoading: {isLoading.toString()}</p>
      <p>isValidating: {isValidating.toString()}</p>
      {total != null && entries != null && (
        <>
          {size * offset < total && (
            <button className="text-blue-600" onClick={() => setSize(size + 1)}>
              load more
            </button>
          )}
          <Entries entries={entries} aria-busy={isValidating} />
          <span className="text-center self-center">
            {offset * (size - 1) + 1} ~ {offset * size} / {total}
          </span>
        </>
      )}
    </section>
  );
}

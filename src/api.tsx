export type Entry = { id: number; name: string };

const entries = new Array(60)
  .fill(0)
  .map((_, i): Entry => ({ id: i, name: `Entry ${i + 1}` }));

export async function fetchEntries(
  page: number = 0,
  offset: number = 20
): Promise<{ total: number; entries: Entry[] }> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          total: entries.length,
          entries: entries.slice(offset * page, offset * (page + 1)),
        }),
      1000
    );
  });
}

export async function entriesFetcher<Query extends string>(arg: Query) {
  const url = new URL(arg, window.origin);
  const page = parseInt(url.searchParams.get("page") ?? "", 10);
  const offset = parseInt(url.searchParams.get("offset") ?? "", 10);
  return fetchEntries(page, offset);
}

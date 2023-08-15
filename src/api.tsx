export type Entry = { id: number; name: string };

const entries = new Array(123)
  .fill(0)
  .map((_, i): Entry => ({ id: i, name: `Entry ${i}` }));

export async function fetchEntries(
  page: number,
  offset: number = 20
): Promise<{ total: number; entries: Entry[] }> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          total: entries.length,
          entries: entries.slice(offset * (page - 1), offset * page - 1),
        }),
      1000
    );
  });
}

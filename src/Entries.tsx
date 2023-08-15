import { ReactNode } from "react";
import type { Entry } from "./api";

export default function Entries({
  entries,
  ...rest
}: { entries: Entry[] } & React.ComponentProps<"ul">): ReactNode {
  return (
    <ul {...rest}>
      {entries.map((entry) => {
        return <li key={entry.id}>{entry.name}</li>;
      })}
    </ul>
  );
}

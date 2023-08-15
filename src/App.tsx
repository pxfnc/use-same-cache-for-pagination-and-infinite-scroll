import Paging from "./Paging";
import Infinite from "./Infinite";

function App() {
  return (
    <section className="w-full">
      <h1 className="text-4xl py-8 px-2 font-bold">
        use paging and infinity scroll
      </h1>
      <div className="flex p-2">
        <Paging className="flex-1" />
        <Infinite className="flex-1" />
      </div>
    </section>
  );
}

export default App;

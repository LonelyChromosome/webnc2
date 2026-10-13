import NewsList from "../components/NewsList";
import PartNav from "../components/PartNav";

const parts = [
  { id: "a", name: "A · Props" },
  { id: "c", name: "C · Number" },
  { id: "d", name: "D · Destructuring" },
  { id: "e", name: "E · CSS" },
];

function LabLR3({ part }) {
  const selected = parts.some(({ id }) => id === part) ? part : "e";

  return (
    <>
      <PartNav lab="lr3" parts={parts} current={selected} />
      <div className={`lab-output ${selected === "e" ? "lr3-final" : ""}`}>
        <main>
          <NewsList mode={`lr3-${selected}`} />
        </main>
      </div>
    </>
  );
}

export default LabLR3;

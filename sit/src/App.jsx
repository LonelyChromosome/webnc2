import LabLR1 from "./labs/LabLR1";
import LabLR2 from "./labs/LabLR2";
import LabLR3 from "./labs/LabLR3";

const labs = [
  { id: "lr1", name: "LR1 · React & JSX", description: "Làm quen với Vite, JSX, dữ liệu JavaScript và CSS." },
  { id: "lr2", name: "LR2 · Function Component", description: "Tạo, import, tái sử dụng và lồng các component." },
  { id: "lr3", name: "LR3 · Props", description: "Truyền Props, Number, destructuring và định dạng NewsItem." },
];

function App() {
  const params = new URLSearchParams(window.location.search);
  const lab = labs.find((item) => item.id === params.get("lab")) || labs[2];
  const part = params.get("part");

  return (
    <div className="lab-app">
      <div className="workspace-header">
        <div className="workspace-heading">
          <span className="workspace-kicker">WEBNC2 / REACT LABS</span>
          <strong>Thực hành ReactJS</strong>
        </div>
        <nav className="lab-tabs" aria-label="Chọn bài thực hành">
          {labs.map((item) => (
            <a
              key={item.id}
              href={`?lab=${item.id}&part=e`}
              className={item.id === lab.id ? "lab-tab active" : "lab-tab"}
              aria-current={item.id === lab.id ? "page" : undefined}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="lab-introduction">
        <h1>{lab.name}</h1>
        <p>{lab.description}</p>
      </div>

      {lab.id === "lr1" && <LabLR1 part={part} />}
      {lab.id === "lr2" && <LabLR2 part={part} />}
      {lab.id === "lr3" && <LabLR3 part={part} />}
    </div>
  );
}

export default App;

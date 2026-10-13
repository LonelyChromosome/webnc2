import PartNav from "../components/PartNav";

const parts = [
  { id: "a", name: "A · Tạo project" },
  { id: "b", name: "B · Cấu trúc" },
  { id: "c", name: "C · App.jsx" },
  { id: "d", name: "D · JSX" },
  { id: "e", name: "E · CSS" },
];

function LabLR1({ part }) {
  const selected = parts.some(({ id }) => id === part) ? part : "e";
  const title = "ReactJS";
  const year = 2026;

  return (
    <>
      <PartNav lab="lr1" parts={parts} current={selected} />
      <main className={`lab-panel lab-lr1 ${selected === "e" ? "lr1-final" : ""}`}>
        {selected === "a" && (
          <section>
            <h2>Tạo project React bằng Vite</h2>
            <p>Chọn Framework: React, Variant: JavaScript.</p>
            <pre><code>{`npm create vite@latest
cd react-lab
npm install
npm run dev`}</code></pre>
            <p>Truy cập địa chỉ do Vite hiển thị (thường là http://localhost:5173).</p>
          </section>
        )}
        {selected === "b" && (
          <section>
            <h2>Cấu trúc cơ bản</h2>
            <pre><code>{`react-lab/
├── public/
├── src/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── index.html`}</code></pre>
            <p><strong>App.jsx</strong>: component chính. <strong>main.jsx</strong>: điểm bắt đầu của React.</p>
            <p><strong>public</strong>: tài nguyên tĩnh. <strong>package.json</strong>: thông tin project và thư viện.</p>
          </section>
        )}
        {selected === "c" && <h1>Website Tin tức</h1>}
        {selected === "d" && (
          <>
            <h1>Website Tin tức</h1>
            <h1>{title}</h1>
            <p>Năm học: {year}</p>
            <p>Hôm nay: {new Date().toLocaleDateString()}</p>
          </>
        )}
        {selected === "e" && (
          <>
            <h1 className="title">{title}</h1>
            <p>Năm học: {year}</p>
            <p>Hôm nay: {new Date().toLocaleDateString()}</p>
          </>
        )}
      </main>
    </>
  );
}

export default LabLR1;

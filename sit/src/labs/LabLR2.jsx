import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsItem from "../components/NewsItem";
import NewsList from "../components/NewsList";
import PartNav from "../components/PartNav";

const parts = [
  { id: "a", name: "A · Header/Footer" },
  { id: "b", name: "B · NewsItem" },
  { id: "c", name: "C · Tái sử dụng" },
  { id: "d", name: "D · Lồng nhau" },
  { id: "e", name: "E · Components" },
];

function LabLR2({ part }) {
  const selected = parts.some(({ id }) => id === part) ? part : "e";
  const title = "ReactJS";
  const year = 2026;

  return (
    <>
      <PartNav lab="lr2" parts={parts} current={selected} />
      <div className="lab-output">
        <Header />
        <main>
          {selected === "a" && (
            <>
              <h1 className="title">{title}</h1>
              <p>Năm học: {year}</p>
              <p>Hôm nay: {new Date().toLocaleDateString()}</p>
            </>
          )}
          {selected === "b" && (
            <>
              <h1 className="title">{title}</h1>
              <p>Năm học: {year}</p>
              <p>Hôm nay: {new Date().toLocaleDateString()}</p>
              <NewsItem />
            </>
          )}
          {selected === "c" && (
            <>
              <NewsItem />
              <NewsItem />
              <NewsItem />
            </>
          )}
          {selected === "d" && (
            <>
              <NewsItem />
              <NewsItem />
              <NewsItem />
              <NewsList />
            </>
          )}
          {selected === "e" && <NewsList />}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default LabLR2;

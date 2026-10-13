import NewsItem from "./NewsItem";
import NewsItemBasic from "./NewsItemBasic";

function NewsList({ mode = "lr2" }) {
  let news;

  if (mode === "lr3-a") {
    // LR3 A: truyền title và description từ cha xuống component con.
    news = (
      <>
        <NewsItemBasic title="NodeJS" description="Lập trình backend" />
        <NewsItemBasic title="React" description="Lập trình frontend" />
        <NewsItemBasic title="Express" description="Framework Node.js" />
      </>
    );
  } else if (mode === "lr3-c") {
    // LR3 C: truyền thêm Props kiểu Number.
    news = (
      <>
        <NewsItemBasic title="NodeJS" description="Lập trình backend" views={120} />
        <NewsItemBasic title="React" description="Lập trình frontend" views={85} />
        <NewsItemBasic title="Express" description="Framework Node.js" views={60} />
      </>
    );
  } else if (mode === "lr3-d" || mode === "lr3-e") {
    // LR3 D/E: dùng NewsItem với destructuring Props và CSS.
    news = (
      <>
        <NewsItem title="NodeJS" description="Lập trình backend" views={120} />
        <NewsItem title="React" description="Lập trình frontend" views={85} />
        <NewsItem title="Express" description="Framework Node.js" views={60} />
      </>
    );
  } else {
    // LR2: sử dụng lại cùng Function Component ba lần.
    news = (
      <>
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </>
    );
  }

  return (
    <section className="news-list">
      <h2>Danh sách tin tức</h2>
      {news}
    </section>
  );
}

export default NewsList;

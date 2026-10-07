import NewsItem from "./NewsItem";

function NewsList() {
  return (
    <section className="news-list">
      <h2>Danh sách tin tức</h2>
      <NewsItem />
      <NewsItem />
      <NewsItem />
    </section>
  );
}

export default NewsList;

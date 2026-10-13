// LR3 - Phần D/E: lấy trực tiếp các giá trị bằng destructuring Props.
// Các giá trị mặc định giữ nguyên ví dụ NewsItem không có Props ở LR2.
function NewsItem({
  title = "ReactJS",
  description = "ReactJS là thư viện xây dựng giao diện người dùng.",
  views,
}) {
  return (
    <article className="news-item">
      <h3 className="news-title">{title}</h3>
      <p>{description}</p>
      {views !== undefined && (
        <p className="news-meta">Lượt xem: {views}</p>
      )}
    </article>
  );
}

export default NewsItem;

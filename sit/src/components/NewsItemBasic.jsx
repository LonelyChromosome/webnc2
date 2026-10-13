// LR3 - Phần A/C: truy cập dữ liệu bằng props.title, props.description, props.views.
function NewsItemBasic(props) {
  return (
    <article className="news-item">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      {props.views !== undefined && <p>Lượt xem: {props.views}</p>}
    </article>
  );
}

export default NewsItemBasic;

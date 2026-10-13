function PartNav({ lab, parts, current }) {
  return (
    <nav className="part-nav" aria-label="Chọn phần thực hành">
      {parts.map(({ id, name }) => (
        <a
          key={id}
          href={`?lab=${lab}&part=${id}`}
          className={id === current ? "part-link active" : "part-link"}
          aria-current={id === current ? "step" : undefined}
        >
          {name}
        </a>
      ))}
    </nav>
  );
}

export default PartNav;

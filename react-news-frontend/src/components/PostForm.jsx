import { useState } from "react";

function PostForm({ initialPost, onSubmit, buttonText }) {
  const [title, setTitle] = useState(
    initialPost ? initialPost.title : ""
  );
  const [description, setDescription] = useState(
    initialPost ? initialPost.description : ""
  );

  function handleSubmit(event) {
    event.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung");
      return;
    }
    const postData = {
      title: title,
      description: description
    };
    onSubmit(postData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tiêu đề</label><br />
        <input type="text" value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div><br />
      <div>
        <label>Nội dung</label><br />
        <textarea rows="5" value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div><br />
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default PostForm;

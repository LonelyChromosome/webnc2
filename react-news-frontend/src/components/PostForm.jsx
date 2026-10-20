import { useEffect, useState } from "react";
function PostForm({ initialPost, onSubmit, buttonText }) {
  const [title, setTitle] = useState(initialPost?.title || "");
  const [description, setDescription] = useState(initialPost?.description || "");
  useEffect(() => {
    setTitle(initialPost?.title || "");
    setDescription(initialPost?.description || "");
  }, [initialPost]);
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ title, description });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div><label>Tiêu đề</label><br /><input required value={title} onChange={(event) => setTitle(event.target.value)} /></div>
      <div><label>Mô tả</label><br /><textarea required value={description} onChange={(event) => setDescription(event.target.value)} /></div>
      <button type="submit">{buttonText}</button>
    </form>
  );
}
export default PostForm;

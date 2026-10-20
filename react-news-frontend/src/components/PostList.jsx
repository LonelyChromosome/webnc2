import PostItem from "./PostItem";
function PostList({ posts, user, onDeleted }) {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} user={user} onDeleted={onDeleted} />
      ))}
    </>
  );
}
export default PostList;

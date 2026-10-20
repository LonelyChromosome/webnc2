const db = require("../services/fileDatabase");
module.exports = {
  getAllPosts: () => db.readPosts(),
  getPostById: (id) => db.findById(id),
  searchPosts: (keyword) => db.search(keyword),
  createPost: (title, description) => db.createPost(title, description),
  updatePost: (id, title, description) => db.updatePost(id, title, description),
  deletePost: (id) => db.deletePost(id)
};

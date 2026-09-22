const database = require("../services/fileDatabase");

async function news(req, res, next) {
  try {
    const posts = await database.readPosts();

    res
      .status(200)
      .type("application/json")
      .send(JSON.stringify(posts, null, 2));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  news
};

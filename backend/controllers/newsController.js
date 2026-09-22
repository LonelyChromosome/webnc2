const db = require("../config/db");

async function list(req, res, next) {
  try {
    const [newsList] = await db.query(
      "SELECT * FROM posts ORDER BY id DESC LIMIT 10"
    );

    res.render("news", {
      id: "",
      newsList
    });
  } catch (error) {
    next(error);
  }
}

async function detail(req, res, next) {
  try {
    const id = req.params.id;
    const [newsList] = await db.query(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    res.render("news", {
      id,
      newsList
    });
  } catch (error) {
    next(error);
  }
}

async function search(req, res, next) {
  try {
    const keyword = req.query.keyword || "";
    let newsList = [];

    if (keyword) {
      [newsList] = await db.query(
        "SELECT * FROM posts WHERE title LIKE ? OR description LIKE ?",
        [`%${keyword}%`, `%${keyword}%`]
      );
    }

    res.render("search", {
      keyword,
      newsList
    });
  } catch (error) {
    next(error);
  }
}

function showCreate(req, res) {
  res.render("create");
}

async function create(req, res, next) {
  try {
    await db.query(
      "INSERT INTO posts(title, description) VALUES (?, ?)",
      [req.body.title, req.body.description]
    );

    res.redirect("/news");
  } catch (error) {
    next(error);
  }
}

async function showEdit(req, res, next) {
  try {
    const id = req.query.id;
    const [rows] = await db.query(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    const post = rows.length > 0 ? rows[0] : null;
    res.render("edit", { post });
  } catch (error) {
    next(error);
  }
}

async function edit(req, res, next) {
  try {
    await db.query(
      "UPDATE posts SET title = ?, description = ? WHERE id = ?",
      [req.body.title, req.body.description, req.body.id]
    );

    res.redirect("/news/" + req.body.id);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    await db.query(
      "DELETE FROM posts WHERE id = ?",
      [req.query.id]
    );

    res.redirect("/news");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  detail,
  search,
  showCreate,
  create,
  showEdit,
  edit,
  remove
};

const postModel = require("../../models/postModel");
const failure = (res, error, message) => { console.error(error); return res.status(500).json({ success: false, message }); };
const valid = (body) => typeof body.title === "string" && body.title.trim() && typeof body.description === "string" && body.description.trim();
async function index(req, res) {
  try { res.json({ success: true, data: await postModel.getAllPosts() }); }
  catch (e) { failure(res, e, "Lỗi khi lấy danh sách bài viết"); }
}
async function show(req, res) {
  try {
    const post = await postModel.getPostById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
    res.json({ success: true, data: post });
  } catch (e) { failure(res, e, "Lỗi khi lấy chi tiết bài viết"); }
}
async function search(req, res) {
  try {
    const keyword = String(req.query.keyword || "");
    res.json({ success: true, keyword, data: await postModel.searchPosts(keyword) });
  } catch (e) { failure(res, e, "Lỗi khi tìm kiếm bài viết"); }
}
async function store(req, res) {
  if (!valid(req.body || {})) return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ title và description" });
  try {
    const data = await postModel.createPost(req.body.title.trim(), req.body.description.trim());
    res.status(201).json({ success: true, message: "Thêm bài viết thành công", data });
  } catch (e) { failure(res, e, "Lỗi khi thêm bài viết"); }
}
async function update(req, res) {
  try {
    const post = await postModel.getPostById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
    if (!valid(req.body || {})) return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ title và description" });
    const data = await postModel.updatePost(req.params.id, req.body.title.trim(), req.body.description.trim());
    res.json({ success: true, message: "Cập nhật bài viết thành công", data });
  } catch (e) { failure(res, e, "Lỗi khi cập nhật bài viết"); }
}
async function destroy(req, res) {
  try {
    const post = await postModel.getPostById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
    await postModel.deletePost(req.params.id);
    res.json({ success: true, message: "Xóa bài viết thành công" });
  } catch (e) { failure(res, e, "Lỗi khi xóa bài viết"); }
}
module.exports = { index, show, search, store, update, destroy };

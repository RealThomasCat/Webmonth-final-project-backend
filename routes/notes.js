const express = require("express");
const { addNote } = require("../controllers/notes");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

module.exports = router;

router.post("/add", verifyToken, addNote);


// localhost:8000/note/add
// localhost:8000/note/update/:noteId
// localhost:8000/note/delete/:noteId  
// localhost:8000/note/getallnotes
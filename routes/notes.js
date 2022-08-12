const express = require("express");
const { addNote, getAllNotes, updateNote, deleteNote } = require("../controllers/notes");
const { verifyToken } = require("../middlewares/authMiddleware");
const { handleNoteIdParam } = require("../middlewares/noteMiddleware");
const router = express.Router();

module.exports = router;

router.param("noteId", handleNoteIdParam); // jab bhi kisi ese route par req ayegi jismai noteId hai waha ye chalega

router.post("/add", verifyToken, addNote); //post used for sending data

router.get("/getallnotes", verifyToken, getAllNotes); //get used for recieving data

router.put("/update/:noteId", verifyToken, updateNote); //put used for updating data

router.put("/delete/:noteId", verifyToken, deleteNote);

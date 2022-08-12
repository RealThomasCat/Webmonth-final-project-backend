const client = require("../configs/db");

exports.addNote = (req, res) => {
  const { heading, content } = req.body;

  client
    .query(
      `INSERT INTO notes (email, heading, content) VALUES ('${req.email}', '${heading}', '${content}');`
    )
    .then((data) => {
      res.status(200).json({ message: "Note added successfully!" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Database error occured!" });
    });
};

exports.getAllNotes = (req, res) => {
  client
    .query(`SELECT * FROM notes WHERE email = '${req.email}'`)
    .then((data) => {
      const noteData = data.rows;
      const filteredData = noteData.map((note) => {
        return {
          noteId: note.noteid,
          heading: note.heading,
          content: note.content,
        };
      });
      res.status(200).json({
        message: "Notes recieved and data filtered successfully!",
        data: filteredData,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: "Database error occured!" });
    });
};

exports.updateNote = (req, res) => {
  const noteId = req.params.noteId;
  const { heading, content } = req.body;
  client
    .query(`UPDATE notes SET heading = '${heading}', content = '${content}' WHERE noteid = '${noteId}'`)
    .then((data) => {
      res.status(200).json({
        message: "Note Updated successfully!",
      });
    })
    .catch((err) => {
      res.status(400).json({ message: "Database error occured!" });
    });
};

exports.deleteNote = (req, res) => {
  const noteId = req.noteId; // extracting noteId using router.param (noteMiddleware)
  client
    .query(`DELETE FROM notes WHERE noteid = '${noteId}'`)
    .then((data) => {
      res.status(200).json({
        message: "Note deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(400).json({ message: "Database error occured!" });
    });
};

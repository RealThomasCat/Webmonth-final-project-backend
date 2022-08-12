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

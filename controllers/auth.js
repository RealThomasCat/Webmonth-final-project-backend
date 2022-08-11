const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/db");

// const temperoryData = [
//     {
//         name: "Tom1",
//         email: "Tom1@gmail.com",
//         password: "Thomas1",
//     },
//     {
//         name: "Tom2",
//         email: "Tom2@gmail.com",
//         password: "Thomas2",
//     },
//     {
//         name: "Tom3",
//         email: "Tom3@gmail.com",
//         password: "Thomas3",
//     },
// ];

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;

  // const isValid = temperoryData.findIndex((ele) => (ele.email === email));

  client
    .query(`SELECT * FROM users where email = '${email}';`)
    .then((data) => {
      isValid = data.rows;

      if (isValid.length !== 0) {
        res.status(400).json({
          error: "User already exists!",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "Internal server error!",
            });
          }
          const user = {
            name,
            email,
            password: hash,
          };

          client
            .query(
              `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}');`
            )
            .then((data) => {
              const token = jwt.sign(
                {
                  email: email,
                },
                process.env.SECRET_KEY
              );
              res.status(200).json({
                message: "user added successfully to database!",
                token: token,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: "Database error occured!",
              });
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occured!",
      });
    });
};

exports.signIn = (req, res) => {
  //TODO: complete signin
  const { email, password } = req.body;

  // const isValid = temperoryData.findIndex((ele) => (ele.email === email));

  client
    .query(`SELECT * FROM users where email = '${email}';`)
    .then((data) => {
      userData = data.rows;

      if (userData.length === 0) {
        res.status(400).json({
          error: "User don't exist, signup instead!",
        });
      } else {
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "Server Error!",
            });
          } else if (result === true) {
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({
              message: "user signed in successfully!",
              token: token,
            });
          } else {
            res.status(400).json({
              error: "unauthorized!"
            })
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occured!",
      });
    });
};

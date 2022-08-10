const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const temperoryData = [
    {
        name: "Tom1",
        email: "Tom1@gmail.com",
        password: "Thomas1",
    },
    {
        name: "Tom2",
        email: "Tom2@gmail.com",
        password: "Thomas2",
    },
    {
        name: "Tom3",
        email: "Tom3@gmail.com",
        password: "Thomas3",
    },
]

exports.signUp = (req, res) => {

    const { name, email, password } = req.body;

    const isValid = temperoryData.findIndex((ele) => (ele.email === email));

    if (isValid !== -1) {
        res.status(400).json({
            error: "User already exists",
        });
    }

    //NOTE: Generate token

    const token = jwt.sign(
        {
            email: email,
        },
        process.env.SECRET_KEY
    );

    console.log(token);

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: "Internal server error",
            });
        }

        const user = {
            name,
            email,
            password: hash,
        };

        temperoryData.push(user);

        console.log(temperoryData);

        res.status(200).json({
            message: "user added successfully to database",
            token: token,
        });
    });
};

exports.signIn = (req, res) => {
    //TODO: complete signin
}
const jwt = require("jsonwebtoken");
const userModel = require("../model/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("Please Login!");
        }

        const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

        const { _id } = decodedObj;

        const user = await userModel.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Opps Something went wrong!: " + err.message);
    }
};

module.exports = {
    userAuth,
};
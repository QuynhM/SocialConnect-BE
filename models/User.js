const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema({
    name: {
        type: String, 
        require: true,
    },
    email: {
        type: String, 
        require: true,
        unique: true,
    },
    password: {
        type: String, 
        require: true,
        select: false,
    },
    avatarUrl: {
        type: String, 
        require: false,
        default: "",
    },
    coverUrl: {
        type: String, 
        require: false,
        default: "",
    },
    aboutMe: {
        type: String, 
        require: false,
        default: "",
    },
    city: {
        type: String, 
        require: false,
        default: "",
    },
    country: {
        type: String, 
        require: false,
        default: "",
    },
    company: {
        type: String, 
        require: false,
        default: "",
    },
    jobTitle: {
        type: String, 
        require: false,
        default: "",
    },
    socialMediaLink: {
        type: String, 
        require: false,
        default: "",
    },

    isDeleted: { type: Boolean, default: false, select: false},
    friendCount: { type: Number, default: 0 },
    postCount: { type: Number, default: 0 }
},
{ timestamps: true }
);

userSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.password;
    delete user.isDeleted;
    return user;
};

userSchema.methods.generateToken = async function() {
    const accessToken = await jwt.sign({ _id: this._id}, JWT_SECRET_KEY, { expiresIn: "1d",});
    return accessToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
// const sessionIdToUserMap = new Map()
const jwt = require("jsonwebtoken")
const secret = "snct^hit"

function setUser(user) {
    // sessionIdToUserMap.set(id,user)
    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, secret)
}

function getUser(token) {
    // sessionIdToUserMap.get(id)
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }   
}

module.exports = {
    setUser, getUser
}

const bcrypt = require("bcrypt")
const User = require('../models/user.model')
const {generateToken} = require("../utils/jwt")

exports.register = async (req, res) => {
    try {
        const { FirstName, LastName, password, email } = req.body

        if (!FirstName || !LastName || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing feilds" })
        }

        const existing = await User.findOne({ email })
        if (existing) {
           return res.status(409).json({ success: false, message: 'email already exist ' })
        }

        const hashed = await bcrypt.hash(password, 10)

        const user = await User.create({
            FirstName,
            LastName,
            email,
            password: hashed
        })

        const token = generateToken(user._id)

        const userResponse = {
            id: user._id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            email: user.email
        }

        return res.status(200).json({ success: true, data: { user: userResponse, token } })

    } catch (err) {
        console.log("Registeration error", err)
        return res.status(500).json({ success: false, message: "Server error" })
    }
}

exports.login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "missing field" })
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: "No account found" });
    }


    const match = await bcrypt.compare(password, user.password);
    if (!match) {
       return res.status(401).json({ success: false, message: "Invalid Credientials" })
    }

    const token = await generateToken(user._id)

    const userResponse = {
        id: user._id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        email: user.email
    }

    res.status(200).json({ success: true, data: { userResponse, token } })
}

exports.me = async (req, res) => {
    try {
        // auth.middleware should set req.user = { id, ... }
        const userId = req.user && req.user.id;
        if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        return res.json({ success: true, data: user });
    } catch (err) {
        console.error('Me error', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
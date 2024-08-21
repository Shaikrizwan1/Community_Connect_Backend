const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        console.log(user)
        if (user && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            res.json({ token, user: user.username, role: user.role || null });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    res.json({ message: 'Logout successful' });
};


exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        // Create a new user
        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};


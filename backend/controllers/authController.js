// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ id: user._id }, 'tu_secreto', { expiresIn: '1h' });
        res.json({ message: 'Autenticación exitosa', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

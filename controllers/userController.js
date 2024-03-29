import User from "../models/user.js";
import bcrypt from "bcryptjs";
export async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        return res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export async function getUserById(req, res) {
    try {
        const userId = Number(req.params.id);
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        else {
            const { password, ...userWithoutPassword } = user.toJSON();
            res.json(userWithoutPassword);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export async function getAllUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
        });
        res.json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export async function updateUser(req, res) {
    try {
        const userId = Number(req.params.id);
        const { username, email, password } = req.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        await user.update({ username, email, password: hashedPassword });
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export async function deleteUser(req, res) {
    try {
        const userId = Number(req.params.id);
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await user.destroy();
        res.status(204).end();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

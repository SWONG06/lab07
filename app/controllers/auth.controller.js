import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authConfig from "../config/auth.config.js";

const {user: User, role: Role} = db;

export const signUp = async (req, res) => {
    try {
        const {username, email, password, roles} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        const userRole = await Role.findOne({ where: { name: "user" }});

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        await user.setRoles([userRole]);

        res.status(201).json({message: "Usuario registrado exitosamente."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const signIn = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({
            where: { username },
            include: {
                model: Role,
                as: "roles",
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        
        if (!passwordIsValid) {
            return res.status(401).json({ accessToken: null, message: "Contraseña inválida." });
        }

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        });

        const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);

        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

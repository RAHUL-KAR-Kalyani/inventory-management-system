const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/** @type {import("mongoose").Model<any>} */
const userModel = require('../models/userModel');



const registerController = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        console.log(name, email, password, role)

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields required",
                success: false
            })
        }

        //email check
        const email_id = await userModel.findOne({ email });
        if (email_id) {
            return res.status(400).json({
                message: "email already registered",
                success: false
            })
        }

        //encrypting password
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

        //creating use in db

        await userModel.create({ name, email, password: hashedPassword, role });

        return res.status(200).json({
            message: "Profile created",
            success: true,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

const loginController = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "all fields required",
                success: false
            });
        }

        //email check
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "incorrect email",
                success: false
            });
        }

        // console.log('Password :', password);
        // console.log('User Password :', user.password);

        //pwd check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "password does not matched",
                success: false
            });
        }

        // role check
        if (user.role !== role) {
            return res.status(400).json({
                message: "user role mismatched",
                success: false
            });
        }

        // jwt token
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome ${user.name} !`,
            token,
            user,
            success: true
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

const profileController = async (req, res) => {
    try {
        const userId = req.body.userId;

        const userProfile = await userModel.findById(userId).select('-password');

        if (!userProfile) {
            console.log('user not found')
            return res.status(404).json({
                message: "user not found",
                success: false
            })
        }

        console.log(userProfile);
        return res.status(200).json({
            message: "Profile retrived",
            userProfile,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

const logoutController = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}


module.exports = { registerController, loginController, profileController, logoutController };
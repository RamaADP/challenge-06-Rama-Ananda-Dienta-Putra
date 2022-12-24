import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateTokens from "../utils/generateTokens.js";
import { signUpBodyValidation, logInBodyValidation } from "../utils/validationSchema.js";

const loginController = {
    post: async (req, res) => {
        try {
            const { error } = logInBodyValidation(req.body);
            if (error){
                return res.status(400).json({ error: true, message: error.details[0].message });
            };

            const user = await User.findOne({ email: req.body.email });
            if (!user){
                return res.status(401).json({ error: true, message: "Invalid email or password" });
            };

            const verifiedPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!verifiedPassword)
                return res.status(401).json({ error: true, message: "Invalid email or password" });

            const { accessToken, refreshToken } = await generateTokens(user);

            res.status(200).json({
                error: false,
                accessToken,
                refreshToken,
                message: "Logged in sucessfully",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
}};

export default loginController;
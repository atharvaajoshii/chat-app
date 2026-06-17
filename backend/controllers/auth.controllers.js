import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generatetokenandsetcookie from "../utils/generatetoken.js";


export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "passowrds dont match" })
        }
        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "user exists" })
        }
        // hash password here
        const hashedpassword = await bcrypt.hash(password, 10)

        // https://api.dicebear.com/10.x/lorelei/svg?seed=Felix
        // https://xsgames.co/randomusers/avatar.php?g=male 

        const profile = `https://xsgames.co/randomusers/assets/avatars/pixel/${Math.floor(Math.random() * 50)}.jpg`;
        const newUser = new User({
            fullname,
            username,
            password: hashedpassword,
            gender,
            profilePic: profile
        })
        if (newUser) {
            //generate JWT token here

            generatetokenandsetcookie(newUser._id, res)

            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: "invalid user data" })
        }

    } catch (err) {
        res.status(500).json({ error: "Internal server Error" })
        console.log("error in signupcontroller" + err)
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        const ispasswordcorrect = await bcrypt.compare(password, user.password || "");

        if(!user || !ispasswordcorrect){
            res.status(400).json({error:"username/password not correct"})
        }
        generatetokenandsetcookie(user._id,res)

        res.status(200).json({
            id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilePic:user.profilePic,
            
        })
        
    } catch (err) {
        res.status(500).json({ error: "Internal server Error" })
        console.log("error in logincontroller" + err)
    }
}
export const logout = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out successfully"})
    }catch (err) {
        res.status(500).json({ error: "Internal server Error" })
        console.log("error in logincontroller" + err)
    }
}
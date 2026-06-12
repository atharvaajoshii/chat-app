import User from "../models/user.model.js"

export const getuserforsidebar = async (req,res)=>{
    try {
        const loggedinuserid = req.user._id
        const filtereduser = await User.find({_id:{$ne:loggedinuserid}}).select("-password ")

        return res.status(200).json(filtereduser)


    } catch (error) {
        res.status(500).json({ error: "internal server error" })
        console.log("error in usercontroller", err)
    }
}
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"


export const sendmessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderid = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderid, receiverId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderid, receiverId],
            })
        }
        const newmessage = new Message({
            senderId: senderid,
            receiverId: receiverId,
            message: message
        })

        if (newmessage) {
            conversation.messages.push(newmessage._id)
        }


        // socketio



        // await conversation.save();
        // await newmessage.save();
        // runs in parallel
        await Promise.all([conversation.save(), newmessage.save()])

        res.status(201).json({ newmessage })

    } catch (err) {
        res.status(500).json({ error: "internal server error" })
        console.log("error in sendmessage", err)
    }
}

export const getmessages = async (req, res) => {
    try {
        const {id:usertochatid}= req.params
        const senderId = req.user._id 
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,usertochatid]}
        }).populate("messages");

        if(!conversation){return res.status(200).json([])};
        const messages = conversation.messages;
        res.status(200).json(conversation.messages)

    } catch (error) {
        res.status(500).json({ error: "internal server error" })
        console.log("error in getmessage", err)
    }
}
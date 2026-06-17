import express from "express"
import { sendmessage,getmessages } from "../controllers/message.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/:id',protectRoute,getmessages)
router.post('/send/:id',protectRoute,sendmessage)

export default router;
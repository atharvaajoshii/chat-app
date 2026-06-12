import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { getuserforsidebar } from "../controllers/user.controllers.js";

const router = express.Router();

router.get('/',protectRoute,getuserforsidebar)

export default router;
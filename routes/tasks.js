import express from "express"
import { addTask, myTask, updateTask, deleteTask } from "../controller/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/addTask", isAuthenticated, addTask)
router.get("/myTask", isAuthenticated, myTask)
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)

export default router;
import express from "express";
import { 
    getTask,
    shareTask,
    deleteTask,
    getTaskByUserID,
    createTask,
    toggleCompleted,
    getUserByEmail,
    getUserByID,
    getSharedTaskByID
 } from "./database.js";
import cors from "cors";

const corsOptions = {
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions))

app.get("/tasks/:user_id", async (req, res) => {
    const tasks = await getTaskByUserID(req.params.user_id);
    res.status(200).send(tasks);
})

app.get("/tasks/shared_tasks/:id", async (req, res) => {
    const task = await getSharedTaskByID(req.params.id);
    const author = await getUserByID(task.user_id);
    const shared_with = await getUserByID(task.shared_with_id);
    res.status(201).send({author, shared_with});
})

app.get("/users/:id", async (req, res) => {
    const user = await getUserByID(req.params.id);
    res.status(200).send(user);
});
  
app.put("/tasks/:id", async (req, res) => {
    const { value } = req.body;
    const task = await toggleCompleted(req.params.id, value);
    res.status(200).send(task);
});

app.delete("/tasks/:id", async (req, res) => {
    await deleteTask(req.params.id);
    res.send({ message: "Task deleted successfully" });
});
  
app.post("/tasks/shared_tasks", async (req, res) => {
    const { task_id, user_id, email } = req.body;
    // const { task_id, user_id, shared_with_id } = req.body;
    const userToShare = await getUserByEmail(email);
    console.log(userToShare);
    
    const sharedTask = await shareTask(task_id, user_id, userToShare.id);
    res.status(201).send(sharedTask);
});

app.post("/tasks", async (req, res) => {
    const { user_id, title } = req.body;
    const task = await createTask(user_id, title);
    res.status(201).send(task);
  });

app.listen(8080, () => {
    console.log("Server running on port 8080")
})
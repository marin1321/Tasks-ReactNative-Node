import express from "express";
import { 
    createUser,
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
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const corsOptions = {
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const JWT_SECRET = process.env.JWT_TOKEN;

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(name, email, hashedPassword);
    res.status(201).json({ message: "User registered successfully", user: newUser });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(403).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

    res.status(200).json({ token, userId: user.id });
});



app.get("/tasks/:user_id", authenticateToken, async (req, res) => {
    const tasks = await getTaskByUserID(req.params.user_id);
    res.status(200).send(tasks);
})

app.get("/tasks/shared_tasks/:id", authenticateToken, async (req, res) => {
    const task = await getSharedTaskByID(req.params.id);
    const author = await getUserByID(task.user_id);
    const shared_with = await getUserByID(task.shared_with_id);
    res.status(200).send({author, shared_with});
})

app.get("/users/:id", authenticateToken, async (req, res) => {
    const user = await getUserByID(req.params.id);
    res.status(200).send(user);
});
  
app.put("/tasks/:id", authenticateToken, async (req, res) => {
    const { value } = req.body;
    const task = await toggleCompleted(req.params.id, value);
    res.status(200).send(task);
});

app.delete("/tasks/:id", authenticateToken, async (req, res) => {
    await deleteTask(req.params.id);
    res.send({ message: "Task deleted successfully" });
});
  
app.post("/tasks/shared_tasks", authenticateToken, async (req, res) => {
    const { task_id, user_id, email } = req.body;
    // const { task_id, user_id, shared_with_id } = req.body;
    const userToShare = await getUserByEmail(email);
    console.log(userToShare);
    
    const sharedTask = await shareTask(task_id, user_id, userToShare.id);
    res.status(201).send(sharedTask);
});

app.post("/tasks", authenticateToken, async (req, res) => {
    const { user_id, title } = req.body;
    const task = await createTask(user_id, title);
    res.status(201).send(task);
  });

app.listen(8080, () => {
    console.log("Server running on port 8080")
})
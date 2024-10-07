import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function createUser(name, email, password) {
  const [result] = await pool.query(
    `
    INSERT INTO users (name, email, password) 
    VALUES (?, ?, ?)
  `,
    [name, email, password]
  );
  const taskID = result.insertId;
  return getTask(taskID);
}

export async function getTaskByUserID(id) {
  const [rows] = await pool.query(
    `
    SELECT tasks.*, share_task.shared_with_id FROM tasks 
    LEFT JOIN share_task ON tasks.id = share_task.task_id
    WHERE tasks.user_id = ? OR share_task.shared_with_id = ?;
  `,
    [id, id]
  );
  return rows;
}

export async function getTask(id) {
  const [rows] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [id]);
  return rows[0];
}

export async function getSharedTaskByID(id) {
  const [rows] = await pool.query(
    `SELECT * FROM share_task WHERE task_id = ?`,
    [id]
  );
  return rows[0];
}

export async function getUserByID(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}

export async function getUserByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0];
}

export async function createTask(user_id, title) {
  const [result] = await pool.query(
    `
    INSERT INTO tasks (user_id, title)
    VALUES (?, ?)
  `,
    [user_id, title]
  );
  const taskID = result.insertId;
  return getTask(taskID);
}

export async function deleteTask(id) {
  const [result] = await pool.query(
    `
    DELETE FROM tasks WHERE id = ?;
    `,
    [id]
  );
  return result;
}

export async function toggleCompleted(id, value) {
  const newValue = value === true ? "TRUE" : "FALSE";
  const [result] = await pool.query(
    `
    UPDATE tasks
    SET completed = ${newValue} 
    WHERE id = ?;
    `,
    [id]
  );
  return result;
}

export async function shareTask(task_id, user_id, shared_with_id) {
  const [result] = await pool.query(
    `
    INSERT INTO share_task (task_id, user_id, shared_with_id) 
    VALUES (?, ?, ?);
    `,
    [task_id, user_id, shared_with_id]
  );
  const [sharedTask] = await pool.query(
    `
    SELECT * FROM share_task 
    WHERE id = ?;
    `,
    [result.insertId]
  );
  return sharedTask[0];
}

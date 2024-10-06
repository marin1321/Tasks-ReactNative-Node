CREATE DATABASE to_do;
USE to_do;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE share_task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO users (name, email, password) VALUES ('Steven', 'steven@gmail.com', '123');
INSERT INTO users (name, email, password) VALUES ('Oscar', 'oscar@gmail.com', '456');

INSERT INTO tasks (title, user_id) VALUES 
('📝 Complete project documentation', 1),
('💻 Code review for the new feature', 2),
('📞 Call with the client', 1),
('🛠 Fix bugs in production', 1),
('📅 Schedule team meeting', 2),
('🎨 Design the new landing page', 2),
('🚀 Deploy the latest version', 1),
('📚 Research new technology trends', 1),
('✍️ Write a blog post about APIs', 1),
('🔍 Test and debug user login issues', 1);

INSERT INTO share_task (task_id, user_id, shared_with_id) VALUES (11, 1, 2);


SELECT tasks.*, share_task.shared_with_id FROM tasks 
LEFT JOIN share_task ON tasks.id = share_task.task_id
WHERE tasks.user_id = [user_id] OR share_task.shared_with_id = [user_id];
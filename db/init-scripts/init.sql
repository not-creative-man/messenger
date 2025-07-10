CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255),
    birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    salt VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS dialogues (
    id SERIAL PRIMARY KEY,
    last_message_time TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS dialogue_per_user (
    dialogue_id INT,
    user_id INT,
    FOREIGN KEY (dialogue_id) REFERENCES dialogues(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    time TIMESTAMP NOT NULL,
    dialogue_id INT NOT NULL,
    author_id INT NOT NULL,
    FOREIGN KEY (dialogue_id) REFERENCES dialogues(id),
    FOREIGN KEY (author_id) REFERENCES users(id)
);
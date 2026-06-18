-- Создание таблицы films
CREATE TABLE IF NOT EXISTS films (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration FLOAT NOT NULL,
    poster VARCHAR(255) NOT NULL
);

-- Создание таблицы sessions
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    film_id UUID NOT NULL,
    daytime VARCHAR(50) NOT NULL,
    hall INTEGER NOT NULL,
    rows INTEGER NOT NULL,
    seats INTEGER NOT NULL,
    price FLOAT NOT NULL,
    taken TEXT[] DEFAULT '{}',
    CONSTRAINT fk_film FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_sessions_film_id ON sessions(film_id);
CREATE INDEX IF NOT EXISTS idx_sessions_daytime ON sessions(daytime);

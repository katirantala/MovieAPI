CREATE TABLE genres (
    id INT GENERATED ALWAYS AS IDENTITY,
    genre_name VARCHAR(255),
    PRIMARY KEY (id)
)

CREATE TABLE movies (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    year INT,
    genre_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (genre_id) REFERENCES genres (id)
    )

CREATE TABLE viewers (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    user_name VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    year_of_birth INT,
    PRIMARY KEY (id)
    )

CREATE TABLE reviews (
    id INT GENERATED ALWAYS AS IDENTITY,
    movie_id INT,
    viewer_id  INT,
    review_text TEXT,
    stars INT CHECK (stars BETWEEN 1 AND 5),
    PRIMARY KEY (id),
    FOREIGN KEY (movie_id) REFERENCES movies (id),
    FOREIGN KEY (viewer_id) REFERENCES viewers (id)
    )

CREATE TABLE favourites (
    id INT GENERATED ALWAYS AS IDENTITY,
    movie_id INT,
    viewer_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (movie_id) REFERENCES movies (id),
    FOREIGN KEY (viewer_id) REFERENCES viewers (id)
)
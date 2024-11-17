-- Taulujen luonti

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

-- testidata

INSERT INTO genres (genre_name) VALUES ('action');
INSERT INTO genres (genre_name) VALUES ('drama');
INSERT INTO genres (genre_name) VALUES ('comedy');
INSERT INTO genres (genre_name) VALUES ('scifi');
INSERT INTO genres (genre_name) VALUES ('family');


INSERT INTO movies (name, year, genre_id) VALUES ('Inception', 2010, 1);
INSERT INTO movies (name, year, genre_id) VALUES ('The Dark Knight', 2008, 1);
INSERT INTO movies (name, year, genre_id) VALUES ('The Notebook', 2004, 2);
INSERT INTO movies (name, year, genre_id) VALUES ('Titanic', 1997, 2);
INSERT INTO movies (name, year, genre_id) VALUES ('Hangover', 2009, 3);
INSERT INTO movies (name, year, genre_id) VALUES ('Bridesmaids', 2011, 3);
INSERT INTO movies (name, year, genre_id) VALUES ('Blade Runner 2049', 2017, 4);
INSERT INTO movies (name, year, genre_id) VALUES ('Interstellar', 2014, 4);
INSERT INTO movies (name, year, genre_id) VALUES ('Finding Nemo', 2003, 5);
INSERT INTO movies (name, year, genre_id) VALUES ('The Lion King', 1994, 5);


INSERT INTO viewers (name, user_name, password, year_of_birth) VALUES ('John Doe', 'johndoe', 'password123', 1990);
INSERT INTO viewers (name, user_name, password, year_of_birth) VALUES ('Lisa Simpson', 'lisaaa', 'password456', 2004);
INSERT INTO viewers (name, user_name, password, year_of_birth) VALUES ('Donald Duck', 'duckduck', 'passwor789', 1995);


INSERT INTO reviews (movie_id, viewer_id, review_text, stars) VALUES (1, 1, 'Amazing movie!', 5);
INSERT INTO reviews (movie_id, viewer_id, review_text, stars) VALUES (9, 2, 'Lovely movie!', 4);


INSERT INTO favourites (movie_id, viewer_id) VALUES (1, 1);
INSERT INTO favourites (movie_id, viewer_id) VALUES (3, 2);



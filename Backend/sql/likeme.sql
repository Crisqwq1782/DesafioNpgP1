CREATE DATABASE likeme;

\connect likeme

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(25) NOT NULL,
    img VARCHAR(1000) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    likes INT NOT NULL DEFAULT 0
);

INSERT INTO posts (titulo, img, descripcion, likes)
VALUES (
    'Hatsune Miku',
    'https://a.storyblok.com/f/178900/750x422/5702f51625/project_sekai_kowareta_sekai_to_utaenai_miku_header.jpg/m/filters:quality(95)format(webp)',
    'Esta es la mejor idol virtual',
    0
);
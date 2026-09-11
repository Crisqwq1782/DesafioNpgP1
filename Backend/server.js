const express = require('express');
const cors = require('cors');
const {Pool} = require ('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
 host: 'localhost',
 user: 'postgres',
 password: 'TuContraseña',
 database: 'likeme',
 allowExitOnIdle: true
})
const getDate = async () => {
 const result = await pool.query("SELECT NOW()")
 console.log(result)
};
getDate();


app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener posts:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/posts', async (req, res) => {
    const { titulo, url, descripcion } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, url, descripcion, 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear post:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.put('/posts/like/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Post no encontrado');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al dar like al post:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Post no encontrado');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al eliminar post:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
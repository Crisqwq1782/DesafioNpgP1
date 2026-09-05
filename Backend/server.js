const express = require('express');
const cors = require('cors');
const {Pool} = require ('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
 host: 'localhost',
 user: 'postgres',
 password: 'Tu_contraseña!',
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

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
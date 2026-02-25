const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'mi_secreto_super_seguro_para_clase';

app.use(cors());
app.use(express.json());

// --- USUARIO FICTICIO ---
const USER = {
    id: 1,
    username: 'admin',
    password: '123',
    name: 'Profesor DAW'
};

// --- BASE DE DATOS FICTICIA DE TAREAS ---
let tareas = [
    { id: 1, titulo: 'ini1', descripcion: 'desc1', prioridad: 'Baja', completada: false },
    { id: 2, titulo: 'ini2', descripcion: 'desc2', prioridad: 'Media', completada: true },
    { id: 3, titulo: 'ini3', descripcion: 'desc3', prioridad: 'Alta', completada: false },
];

// ---------------- LOGIN ----------------
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === USER.username && password === USER.password) {
        const token = jwt.sign(
            { id: USER.id, username: USER.username, role: 'admin' },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ success: true, token, user: { name: USER.name } });
    } else {
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
});

// ---------------- MIDDLEWARE JWT ----------------
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó token' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
        req.user = decoded;
        next();
    });
};

// ---------------- OBTENER TAREAS ----------------
// Puedes filtrar por prioridad: /tareas?prioridad=Alta
app.get('/', verifyToken, (req, res) => {
    const { prioridad } = req.query;

    let resultado = tareas;

    if (prioridad) {
        resultado = tareas.filter(t => t.prioridad === prioridad);
    }

    res.json(resultado);
});


app.listen(PORT, () => {
    console.log(`🚀 Servidor JWT corriendo en http://localhost:${PORT}`);
});

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Elige un puerto para tu servidor

// Define la carpeta "public" como carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la página principal de React
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

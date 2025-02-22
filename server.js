const express = require('express');
const path = require('path');

const app = express();
const PORT = 90;
const hostname = 'localhost';

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${hostname}:${PORT}`);
});
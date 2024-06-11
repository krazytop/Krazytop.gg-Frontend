const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 443;

app.use(express.static(path.join(__dirname, '/dist/krazytop-front')));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));

// server.js - Servidor Node.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir arquivos estáticos
app.use(express.static('public'));

// Rota para HTTP Polling
app.get('/time', (req, res) => {
    res.json({ time: new Date().toISOString(), timestamp: Date.now() });
});

// WebSocket: Enviar horário a cada segundo
wss.on('connection', (ws) => {
    const startTime = process.hrtime(); // Captura tempo de alta precisão
    
    const interval = setInterval(() => {
        const diff = process.hrtime(startTime);
        const timestamp = diff[0] * 1000 + diff[1] / 1e6; // Converte para ms
        ws.send(JSON.stringify({ time: new Date().toISOString(), timestamp }));
    }, 1000);

    ws.on('close', () => clearInterval(interval));
});

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));

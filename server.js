const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client.html'));
});

const server = app.listen(port, () => {
  console.log(`HTTP server berjalan di http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client tersambung');

  ws.on('message', (message) => {
    console.log('Received:, ${message}');
    ws.send(`Server menerima: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

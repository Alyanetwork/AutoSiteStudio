const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Yeni bir kullanıcı bağlandı');

    ws.on('message', (message) => {
        // Gelen mesajı tüm bağlantılara ilet
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Bir kullanıcı bağlantıyı kesti');
    });
});

console.log('WebSocket sunucusu 8080 portunda çalışıyor');

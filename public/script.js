document.addEventListener("DOMContentLoaded", () => {
    const pollingTime = document.getElementById("polling-time");
    const wsTime = document.getElementById("ws-time");
    const pollingLatency = document.getElementById("polling-latency");
    const wsLatency = document.getElementById("ws-latency");

    // HTTP Polling a cada 1 segundo
    setInterval(async () => {
        const start = performance.now(); // Captura o tempo antes da requisição
        const response = await fetch("/time");
        const data = await response.json();
        const latency = performance.now() - start; // Calcula o tempo de resposta
        pollingTime.textContent = data.time;
        pollingLatency.textContent = `${latency.toFixed(2)} ms`;
    }, 1000);

    // WebSockets
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
        const receivedTime = performance.now(); // Tempo ao receber a mensagem
        const data = JSON.parse(event.data);
        const latency = receivedTime - data.timestamp; // Diferença entre envio e recebimento
        wsTime.textContent = data.time;
        wsLatency.textContent = `${latency.toFixed(2)} ms`;
    };
});

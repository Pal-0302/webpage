document.getElementById('sendButton').addEventListener('click', () => {
    const message = document.getElementById('textInput').value;
    const animation = document.getElementById('animationSelect').value;
    const speed = document.getElementById('speedControl').value;

    // This is where you send the data to your ESP8266/ESP32 via an API
    // Example placeholder code (you need to set up the ESP with an API endpoint)
    const data = { message, animation, speed };

    fetch('http://your-esp-url/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('statusMessage').textContent = 'Message sent to OLED!';
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('statusMessage').textContent = 'Error sending message.';
    });
});

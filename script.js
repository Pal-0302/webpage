document.getElementById('sendButton').addEventListener('click', () => {
    const message = document.getElementById('textInput').value;
    const animation = document.getElementById('animationSelect').value;
    const speed = document.getElementById('speedControl').value;

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

// Philosophical quote logic
const quotes = [
    "Space is the breath of art. — Frank Lloyd Wright",
    "The universe is under no obligation to make sense to you. — Neil deGrasse Tyson",
    "The cosmos is within us. — Carl Sagan",
    "In the beginning, there was nothing, which exploded. — Terry Pratchett",
    "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood were made in stars. — Carl Sagan"
];

const quoteElement = document.getElementById('randomQuote');
setInterval(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = randomQuote;
}, 7000); // Change quote every 7 seconds

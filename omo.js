import express from 'express';
import startBot from './toji.js'; // Import the bot logic

const app = express();
const PORT = 3000; // Specify the port number

// Start the bot
startBot();

// Add additional routes if needed
app.get('/', (req, res) => {
    res.send('WhatsApp bot server is running!');
});

// Bind the port and start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

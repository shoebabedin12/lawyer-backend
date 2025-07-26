require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const http = require("http");
const { Server } = require('socket.io');
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const route = require('./routes');

// Middleware
app.use(cors());
app.use(express.json()); // express has built-in body parser now
app.use(express.urlencoded({ extended: false })); // instead of bodyParser.urlencoded
app.use(cookieParser());
app.use(route);

// Root route test
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: '*', // adjust to your frontend origin for security
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('🟢 A user connected');

  socket.on('sendMessage', (msg) => {
    io.emit('receiveMessage', msg); // broadcast to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected');
  });
});

// Start server with server.listen (not app.listen)
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

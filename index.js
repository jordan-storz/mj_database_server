const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');
const messageRoutes = require('./routes/message');
const blockUserRoutes = require('./routes/block-users');

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/block_users', blockUserRoutes);

module.exports = app;

app.listen(5200, function () {
  console.log('app listening on port 5200');
});

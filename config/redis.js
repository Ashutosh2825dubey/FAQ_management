// config/redis.js establishing redis connection
const { createClient } = require('redis');// importing redis module
const dotenv = require('dotenv');
dotenv.config();

const client = createClient({
  username: 'default', 
  password: process.env.REDIS_PASS, 
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

client.on('error', (err) => console.error('Redis Client Error', err));

client.connect()
  .then(() => console.log('Redis connected'))
  .catch((err) => console.error('Redis connection error:', err));

module.exports = client;

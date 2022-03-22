//Express.js init
const express = require('express');
const app = express();
app.use(express.json({ extended: false }));

//Create db connection
const connectDB = require('./config/db');
connectDB();

//Allow CORS between front & backend
const cors = require('cors');
app.use(cors({ origin: true, credentials: true }));

//BodyParser.js init
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./config/').get('jwt');



//Trip routes
app.use('/api/trips', require('./routes/api/trips'));

//User routes
app.use('/api/users', require('./routes/api/users'))

//Open server
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));


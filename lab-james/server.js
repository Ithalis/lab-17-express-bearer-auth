'use strict';

require('dotenv').load();

const express = require('express');
const cors = require('cors');
const debug = require('debug')('cfgram:server');
const Promise = require('bluebird');
const errorHandler = require('./lib/error-middleware.js');
const galleryRoutes = require('./routes/gallery-routes.js');
const authRoutes = require('./routes/auth-routes.js');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');

const app = express();
const router = express.Route();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mogodb://localhost/cfgram-dev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(errorHandler);
app.use(cors());
app.use(bodyParser);
app.use('/api', galleryRoutes(router));
app.use('/api', authRoutes(router));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

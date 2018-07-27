// API boilerplate
const express = require('express');

const app = express();

// Logging
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const FileStreamRotator = require('file-stream-rotator');

const logDirectory = `${__dirname}/log`;

// Config
const mongoose = require('mongoose');
const routes = require('./routes');

// BodyParser allows us to get data out of URLs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).catch(err => console.log(err));

// Log all requests in a daily log file using morgan
if (fs.existsSync(logDirectory) === false) {
  fs.mkdirSync(logDirectory);
}
const accessLogStream = FileStreamRotator.getStream({
  filename: `${logDirectory}/access-%DATE%.log`,
  frequency: 'daily',
  date_format: 'YYYYMMDD',
  verbose: false,
});
app.use(morgan('combined', { stream: accessLogStream }));

// Load up the routes
app.use('/', routes);

// Executing the importer
const importers = require('./importers/main');

importers.combinedImporter();

// Start the API
app.listen(process.env.PORT);
console.log(`API running on port ${process.env.PORT}`);

// Export API server for testing
module.exports = app;

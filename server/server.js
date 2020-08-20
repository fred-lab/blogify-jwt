require('dotenv').config({ path: '../.env' });
const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();
const mongoose = require('mongoose');

// Get Environment variables
const {
  APP_PORT,
  MONGO_INITDB_DATABASE,
  MONGO_PORT,
  MONGO_USERNAME,
  MONGO_USER_PASSWORD,
} = process.env;

// Serve the files inside the dist folder where Webpack generate assets
app.use(express.static(path.join(__dirname, '../dist')));
// Configure the view rendering
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, '/..'), 'views']);
app.engine('html', require('ejs').renderFile);

/** Use Gzip Compression */
app.use(compression());

/** For parsing application/json */
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

/** Routers */
app.use('/', require('./controllers/index'));

/** Initiate connection to the database */
(async () => {
  try {
    await mongoose.connect(
      `mongodb://database:${MONGO_PORT}/${MONGO_INITDB_DATABASE}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
          authSource: MONGO_INITDB_DATABASE,
        },
        user: MONGO_USERNAME,
        pass: MONGO_USER_PASSWORD,
      },
    );
    // eslint-disable-next-line no-console
    console.log(
      `Connected to MongoDB server on port "${MONGO_PORT}". Using database => "${MONGO_INITDB_DATABASE}" with user "${MONGO_USERNAME}"`,
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  mongoose.connection.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });
})();

app.listen(APP_PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Nodejs server is running on port ${APP_PORT}`);
});

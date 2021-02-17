const dotenv = require('dotenv');

// config() will read your .env file, parse the contents, assign it to process.env.
if (process.argv.includes('--test') || process.argv.includes('-t')) {
  var envResult = dotenv.config({ path: './.env.test' });
  console.log('Using test environment');
} else {
  var envResult = dotenv.config();
}
if (envResult.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port and host URL
   */
  port: process.env.PORT,
  baseurl: process.env.BASE_URL,
  /**
   * Airtable env variables
   */
  airtableToken: process.env.AIRTABLE_KEY,
  airtableBase: process.env.AIRTABLE_BASE_ID,
  /**
   * Postman env variables
   */
  postmanCollection: process.env.POSTMAN_COLLECTION,
  postmanLink: process.env.POSTMAN_LINK,
  postmanAPIKey: process.env.POSTMAN_API_KEY,
  apiUrl: process.env.API_URL,
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
}
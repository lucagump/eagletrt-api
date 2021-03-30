import dotenv from 'dotenv';

// config() will read your .env file, parse the contents, assign it to process.env.
if (process.argv.includes('--test') || process.argv.includes('-t')) {
  var envResult = dotenv.config({ path: './.env.test' });
  console.log('Using test environment');
} else {
  var envResult = dotenv.config();
}

export default {
  /**
   * Your favorite port and host URL
   */
  port: process.env.HISTORY_PORT,
  baseurl: process.env.BASE_URL,
  /**
   * Mongodb env variables
   */
  databaseUrl: process.env.DB_HOST,
  databaseAddress:process.env.DB_ADDRESS,
  database:process.env.DB_HOST,
  databasePassword:process.env.DB_PASSWORD,
  databaseUser:process.env.DB_USER,
  databaseName:process.env.DB_NAME,
  databaseNameTest:process.env.DB_NAME_TEST,
  databaseConfig:{
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  /**
   * Postman env variables
   */
  postmanCollection: process.env.POSTMAN_COLLECTION,
  postmanLink: process.env.POSTMAN_LINK,
  postmanAPIKey: process.env.POSTMAN_API_KEY,
  apiUrl: process.env.API_URL,
  /**
   * Used by jsonwebtoken
  */
  secretSHSH: process.env.TOKEN_SECRET,
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
}
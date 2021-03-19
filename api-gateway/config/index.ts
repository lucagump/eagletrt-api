import dotenv from 'dotenv';

// config() will read your .env file, parse the contents, assign it to process.env.
if (process.argv.includes('--test') || process.argv.includes('-t')) {
  dotenv.config({ path: './.env.test' });
  console.log('Using test environment');
} else {
  dotenv.config();
}

export default {
  /**
   * Your favorite port and host URL
   */
  port: process.env.GATEWAY_PORT,
  baseurl: process.env.BASE_URL,
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
  /**
   * Used by jsonwebtoken
  */
  secretSHSH: process.env.TOKEN_SECRET,
  loginRedirectUrl: process.env.LOGIN_REDIRECT,
  /**
   * Used to forward to microservice
  */
  history: process.env.HISTORY_PORT,
  users: process.env.USERS_PORT,
  views: process.env.views_PORT
}
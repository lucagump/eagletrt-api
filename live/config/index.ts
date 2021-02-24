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
   * Your favorite MQTTT port and broker host 
   */
  mqttPort: process.env.MQTT_PORT,
  mqttHostname: process.env.MQTT_HOSTNAME,
  topic: process.env.MQTT_TOPIC,
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

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
}
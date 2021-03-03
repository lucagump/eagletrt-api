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
   * Your favorite MQTTT port and broker host 
   */
  mqttPort: process.env.MQTT_PORT,
  mqttHostname: process.env.MQTT_HOSTNAME,
  topic: process.env.MQTT_TOPIC,
  msFrequency: parseInt(process.env.MQTT_FREQUENCY),
  /**
   * Winston config 
   */  
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
}
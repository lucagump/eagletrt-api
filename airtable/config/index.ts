const dotenv = require('dotenv');

// config() will read your .env file, parse the contents, assign it to process.env.
var result = dotenv.config();
console.log(result.parsed);

export default {
  port: process.env.PORT,
  baseurl: process.env.BASE_URL,
  airtableToken: process.env.AIRTABLE_KEY,
  airtableBase: process.env.AIRTABLE_BASE_ID
}
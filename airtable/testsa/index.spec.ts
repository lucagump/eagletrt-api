import PostmanTests from './postman';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.test' });

describe('Tests', function() {
    PostmanTests();
});
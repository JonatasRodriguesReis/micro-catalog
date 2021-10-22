import {config as loadenv} from 'dotenv';
import {join} from 'path';

loadenv({path: join(__dirname, '../.env')});

console.log('config .env', process.env.ELASTIC_SEARCH_HOST);

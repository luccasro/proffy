import knex from 'knex';
import path from 'path';
import dotenv from '../../dotenv.config';

dotenv.config();
const connectionURL = process.env.DATABASE_URL;

const db = connectionURL
  ? knex({
      client: 'pg',
      connection: { connectionString: connectionURL, ssl: true },
      useNullAsDefault: true,
    })
  : knex({
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
      },
      useNullAsDefault: true,
    });

export default db;

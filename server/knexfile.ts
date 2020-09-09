import path from 'path';
import dotenv from './dotenv.config';

dotenv.config();
const connectionURL = process.env.DATABASE_URL;

const client = connectionURL ? 'pg' : 'sqlite3';
const connection = connectionURL
  ? { connectionString: connectionURL, ssl: true }
  : {
      filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    };

module.exports = {
  client,
  connection,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  useNullAsDefault: true,
};

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
};

// NODE_ENV: deveopment
// PORT=5000
// DATABASE_URL=mongodb+srv://admin-um:VDHMKtgSjT1ivA8M@cluster0.qawsvmr.mongodb.net/first-project?retryWrites=true&w=majority
// BCRYPT_SALT_ROUNDS=12
// DEFAULT_PASS=phunivercity!@#

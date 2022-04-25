import 'dotenv/config';

export const config = {
  port: process.env.PORT || 8000,
  uri: process.env.ATLAS_URI,
  jwtSecret: process.env.JWT_SECRET || 'secret'
}
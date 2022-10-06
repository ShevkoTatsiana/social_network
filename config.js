import 'dotenv/config';

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.ATLAS_TEST_URI
  : process.env.ATLAS_URI

export const config = {
  port: process.env.PORT || 8000,
  uri: MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || 'secret'
}

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MASSEGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MESUREMENT_ID,
  keyFilename: process.env.FIREBASE_GCLOUD_APPLICATION_CREDENTIALS,
};
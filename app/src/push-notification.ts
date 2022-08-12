import {initializeApp} from "firebase/app";
import {getToken, getMessaging, onMessage} from "firebase/messaging";

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MASSEGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MESUREMENT_ID
  };

export const initializeFirebase = () => {
    initializeApp(firebaseConfig);
}

export const messaging = getMessaging(initializeApp(firebaseConfig));
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
  });

export const askForPermissionToReceiveNotification = async (reg:ServiceWorkerRegistration) => {
    try {      
        const token = await getToken(messaging, {serviceWorkerRegistration: reg});
        console.log(token, 'token');
        localStorage.setItem("notification-token", token);
        return token;
    } catch(e) {
        console.log(e);
    }
}
import dotenv from 'dotenv';
import admin from 'firebase-admin';
dotenv.config();

// const serviceAccount = require("./serviceAccountKey.json");
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG1 || "{}");

if (!serviceAccount) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY ");
}

if (!admin.apps.length) {
    const connected = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    if (connected) {
        console.log(`✅ Firebase connected successfully`);
    } else {
        console.error(`❌ Failed to connect to Firebase`);
        throw new Error("Failed to initialize Firebase");
    }
}


export const db = admin.firestore();
export const auth = admin.auth();

export default admin;

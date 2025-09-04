import dotenv from "dotenv";
// import * as functions from "firebase-functions";
dotenv.config();
import { app } from "./app";

const isFirebaseEnv =
  !!process.env.FUNCTIONS_EMULATOR ||
  !!process.env.K_SERVICE ||
  !!process.env.FIREBASE_CONFIG;

if (isFirebaseEnv) {
  // Cloud Functions/Emulator
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const functions = require("firebase-functions");
  exports.api = functions.https.onRequest(app);
} else {
  // Local development
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

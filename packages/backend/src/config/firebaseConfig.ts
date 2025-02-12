import * as admin from "firebase-admin";
import { configService } from "./configService";

const { credential } = configService.firebaseConfig;

// Set emulator env variables before initializing Firebase Admin
if (configService.nodeEnv === "local") {
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8081";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
}

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credential),
    // Use local Firestore in development
    ...(configService.nodeEnv === "local" && {
      projectId: credential.project_id,
      databaseURL: `http://localhost:8081?project=${credential.project_id}`,
    }),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();

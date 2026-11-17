/**
 * CivicConnect Firebase Configuration
 * 
 * To connect to your real Firebase project:
 * 1. Follow Section 4 of DATABASE_GUIDE.md to create your Firebase project (e.g. civicconnect-mbmc).
 * 2. In Firebase Console > Project Settings > General > Your Apps > Web App (</>), copy the config object.
 * 3. Paste your config values below:
 */

export const FIREBASE_CONFIG = {
  // Replace these placeholders with your Firebase Web App configuration:
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Check if config has valid non-empty credentials
export const isConfigValid = (config = FIREBASE_CONFIG) => {
  return Boolean(
    config &&
    config.projectId &&
    config.projectId !== "" &&
    config.apiKey &&
    config.apiKey !== ""
  );
};

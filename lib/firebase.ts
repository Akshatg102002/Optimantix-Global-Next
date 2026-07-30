
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import "firebase/compat/auth";

// NOTE: each check below must reference `process.env.NEXT_PUBLIC_*` as a
// static literal — webpack's DefinePlugin only inlines NEXT_PUBLIC_ vars at
// these literal call sites. A dynamic/computed `process.env[someVar]` lookup
// is never inlined and always reads as undefined in the browser bundle,
// which previously made this check warn "missing" even when the values
// below were actually present.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (key !== 'measurementId' && !value) {
    console.warn(`[Firebase] Missing config value: ${key} — check that the matching NEXT_PUBLIC_FIREBASE_* env var is set.`);
  }
});

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebase.firestore();

// Apply Long Polling to prevent network connection blockers in local test environments
db.settings({
  experimentalForceLongPolling: true
});

const analytics = typeof window !== "undefined" ? firebase.analytics() : null;
const auth = firebase.auth();

export { app, db, analytics, auth };

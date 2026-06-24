// Server-only Firebase Admin SDK init — used by generateMetadata/server
// components to read Firestore directly (no client auth/security rules
// round-trip). Never import this from a 'use client' file.
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

let adminApp: App | null = null;
let adminDb: Firestore | null = null;
let warnedMissingCredentials = false;

function getAdminApp(): App | null {
  if (adminApp) return adminApp;

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    if (!warnedMissingCredentials) {
      console.warn('[firebase-admin] Missing service account credentials — Tier 1 SEO overrides disabled.');
      warnedMissingCredentials = true;
    }
    return null;
  }

  adminApp = getApps()[0] || initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  return adminApp;
}

export function getAdminDb(): Firestore | null {
  if (adminDb) return adminDb;
  const app = getAdminApp();
  if (!app) return null;
  adminDb = getFirestore(app);
  return adminDb;
}

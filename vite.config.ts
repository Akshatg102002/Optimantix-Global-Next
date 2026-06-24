
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// lib/firebase.ts reads process.env.NEXT_PUBLIC_FIREBASE_* (Next.js convention,
// since that module is now also bundled by Next for the App Router build).
// Vite doesn't expose process.env in the browser by default, so the values
// are inlined here from the same .env file via `define`.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'NEXT_PUBLIC_');
  const processEnvDefines = Object.fromEntries(
    Object.entries(env).map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
  );

  return {
    plugins: [
      react(),
    ],
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      // Removed specific HMR clientPort to allow auto-detection which works better for mixed environments
    },
    resolve: {
      alias: {
        '@': './'
      }
    },
    define: processEnvDefines,
  };
});

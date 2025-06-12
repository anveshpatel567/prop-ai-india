
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: [
      '@supabase/supabase-js',
      '@supabase/postgrest-js',
      '@supabase/storage-js',
      '@supabase/realtime-js',
      '@supabase/gotrue-js'
    ],
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  ssr: {
    noExternal: ['@supabase/supabase-js'],
  },
}));

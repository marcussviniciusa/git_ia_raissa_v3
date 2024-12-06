/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_API_URL: string;
  readonly VITE_OPENAI_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
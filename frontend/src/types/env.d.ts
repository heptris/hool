interface ImportMetaEnv {
  readonly VITE_OPENVIDU_SERVER_PORT: string;
  readonly VITE_OPENVIDU_SERVER_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

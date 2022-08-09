import { Layout } from "components/layouts/Layout";

export default function App({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

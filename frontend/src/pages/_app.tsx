import { Layout } from "components/layouts/Layout";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";

export default function App({ children }: { children: React.ReactNode }) {
  const { onSilentRefresh } = useAuth();
  useEffect(() => {
    onSilentRefresh();
  }, []);

  return <Layout>{children}</Layout>;
}

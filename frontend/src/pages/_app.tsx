import { Layout } from "components/layouts/Layout";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";

export default function App({ children }: { children: React.ReactNode }) {
  const { onSilentRefresh, logout } = useAuth();
  useEffect(() => {
    onSilentRefresh();
    window.addEventListener("unload", logout);
    return () => {
      window.removeEventListener("unload", logout);
    };
  }, []);

  return <Layout>{children}</Layout>;
}

import { Layout } from "components/layouts/Layout";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

export default function App({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useSelector((state: RootState) => state.navbar);
  const { onSilentRefresh } = useAuth();
  useEffect(() => {
    onSilentRefresh();
    return () => {
      isLoggedIn && alert("앱 종료시");
    };
  }, []);

  return <Layout>{children}</Layout>;
}

import { useEffect } from "react";
import { useRouter } from "@tanstack/react-location";
import { useDispatch, useSelector } from "react-redux";

import { RootState, setIsNavbar } from "store";

import { Layout } from "components/layouts/Layout";

export default function App({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    console.log(router.state.location.pathname);
    router.state.location.pathname === "/login" ||
    router.state.location.pathname === "/error"
      ? dispatch(setIsNavbar(false))
      : dispatch(setIsNavbar(true));
  });

  const { isNavbar } = useSelector((state: RootState) => state.navbar);
  return <>{isNavbar ? <Layout>{children}</Layout> : <>{children}</>}</>;
}

import { useEffect } from "react";
import { useLocation } from "@tanstack/react-location";
import { useDispatch, useSelector } from "react-redux";

import { RootState, setNavMode } from "store";

import { Layout } from "components/layouts/Layout";

export default function App({ children }: { children: React.ReactNode }) {
  const { navMode } = useSelector((state: RootState) => state.navbar);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    location.current.pathname.slice(0, 6) === `/auth/` ||
    location.current.pathname === "/error"
      ? dispatch(setNavMode("unseen"))
      : location.current.pathname.slice(0, 9) === "/meeting/"
      ? dispatch(setNavMode("meetingRoom"))
      : dispatch(setNavMode("default"));
  }, [location.current.pathname]);

  return (
    <>{navMode !== "unseen" ? <Layout>{children}</Layout> : <>{children}</>}</>
  );
}

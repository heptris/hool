import { useEffect } from "react";
import { useRouter } from "@tanstack/react-location";
import { useDispatch, useSelector } from "react-redux";

import { RootState, setIsNavbar } from "store";

import { Layout } from "components/layouts/Layout";
import { MeetingModal } from "components/meeting";
import MeetingGameModal from "components/meeting/gameModal/MeetingGameModal";

export default function App({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    console.log(router.state.location.pathname);
    router.state.location.pathname === "/auth/login" ||
    router.state.location.pathname === "/auth/signup" ||
    router.state.location.pathname === "/auth/find" ||
    router.state.location.pathname === "/error"
      ? dispatch(setIsNavbar(false))
      : dispatch(setIsNavbar(true));
  });

  const { isNavbar, isCreatingRoom, isCreatingGame } = useSelector(
    (state: RootState) => state.navbar
  );

  return (
    <>
      {isNavbar ? (
        <Layout>
          {children}
          {isCreatingRoom && <MeetingModal />}
          {isCreatingGame && <MeetingGameModal/>}
        </Layout>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

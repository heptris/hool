import { useCallback, useEffect } from "react";
import { useRouter } from "@tanstack/react-location";
import { useDispatch, useSelector } from "react-redux";

import { RootState, setIsNavbar, setIsMeetingNavbar } from "store";

import { Layout } from "components/layouts/Layout";
import { MeetingModal } from "components/meeting";
import MeetingGameModal from "components/meeting/gameModal/MeetingGameModal";

export default function App({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(router.state.location.pathname);
    if (
      router.state.location.pathname === "/auth/login" ||
      router.state.location.pathname === "/auth/signup" ||
      router.state.location.pathname === "/auth/find" ||
      router.state.location.pathname === "/error"
    ) {
      dispatch(setIsNavbar(false));
      dispatch(setIsMeetingNavbar(false));
    } else if (router.state.location.pathname === "/meeting") {
      dispatch(setIsMeetingNavbar(true));
      dispatch(setIsNavbar(false));
      console.log("dispatch");
    } else {
      dispatch(setIsNavbar(true));
      dispatch(setIsMeetingNavbar(false));
    }
  });

  const { isNavbar, isCreatingRoom, isCreatingGame, isMeetingNavbar } =
    useSelector((state: RootState) => {
      console.log("selector");
      return state.navbar;
    });

  console.log("isNavbar:" + isNavbar + ", IsMeetingNavbar: " + isMeetingNavbar);
  return (
    <>
      {isNavbar || isMeetingNavbar ? (
        <Layout>
          {children}
          {isCreatingRoom && <MeetingModal />}
          {isCreatingGame && <MeetingGameModal />}
        </Layout>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

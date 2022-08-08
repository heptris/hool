import {
  Outlet,
  ReactLocation,
  Router,
  RouterProps,
} from "@tanstack/react-location";

import App from "pages/_app";
import LoginPage from "pages/auth/login";
import SignPage from "pages/auth/signup";
import FindPage from "pages/auth/find";
import ErrorPage from "pages/error";
import MarketPage from "pages/market";
import ProfilePage from "pages/profile";
import SocialPage from "pages/social";
import MeetingPage from "pages/meeting";
import RoomPage from "pages/meeting/[id]";

const location = new ReactLocation();
const routes = [
  { path: "error", element: <ErrorPage errorMessage="" /> },
  {
    path: "auth",
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignPage /> },
      { path: "find", element: <FindPage /> },
    ],
  },
  {
    element: <App children={<Outlet />} />,
    children: [
      { path: "/", element: <MeetingPage /> },
      { path: "market", element: <MarketPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "social", element: <SocialPage /> },
      {
        path: "meeting",
        children: [
          { path: "/", element: <MeetingPage /> },
          { path: ":id", element: <RoomPage /> },
        ],
      },
    ],
  },
];

export const Routes = (
  props: Omit<RouterProps, "children" | "location" | "routes"> = {}
) => {
  return <Router {...props} location={location} routes={routes} />;
};

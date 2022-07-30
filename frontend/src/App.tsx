import { Layout } from "components/layouts/Layout";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  MarketPage,
  ProfilePage,
  SocialPage,
  ErrorPage,
  LoginPage,
  RoomPage,
} from "pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/market" element={<MarketPage />} />
      <Route path="/social" element={<SocialPage />} />
      <Route
        path="/error"
        element={
          <ErrorPage errorMessage="(Error Message : 주소 입력 오류)" /> //Router Page props주는 방법 학습해야함.
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/room" element={<RoomPage />} />
    </Routes>
  );
}

export default App;

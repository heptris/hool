import { Layout } from "components/layouts/Layout";
import { Routes, Route } from "react-router-dom";
import { HomeView, ProfileView, ErrorPage, LoginPage } from "pages";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route
          path="/error"
          element={
            <ErrorPage errorMessage="(Error Message : 주소 입력 오류)" /> //Router Page props주는 방법 학습해야함.
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

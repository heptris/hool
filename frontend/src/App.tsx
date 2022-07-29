import { Layout } from "components/layouts/Layout";
import { Routes, Route } from "react-router-dom";
import { HomeView, ProfilePage, SocialPage } from "pages";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/social" element={<SocialPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

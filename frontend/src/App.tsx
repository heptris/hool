import { Layout } from "components/layouts/Layout";
import { Routes, Route } from "react-router-dom";
import { HomeView, ProfileView } from "pages";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </Layout>
  );
}

export default App;

import { Layout } from "components/layouts/Layout";
import { Routes, Route } from "react-router-dom";
import { HomePage, MarketPage, ProfilePage } from "pages";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/market" element={<MarketPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

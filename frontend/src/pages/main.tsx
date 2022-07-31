import { Outlet } from "@tanstack/react-location";

import { Layout } from "components/layouts/Layout";

const mainLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default mainLayout;

import { Outlet } from "@tanstack/react-location";

import { Layout } from "components/layouts/Layout";

const index = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default index;

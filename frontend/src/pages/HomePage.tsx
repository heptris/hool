import Button from "components/commons/Button";
import { Layout } from "components/layouts/Layout";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Layout>
      <Link to={"/profile"}>
        <Button height={3} width={6} />
      </Link>
    </Layout>
  );
};

export default HomePage;

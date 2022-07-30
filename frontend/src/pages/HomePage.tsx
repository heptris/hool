import Button from "components/commons/Button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Link to={"/profile"}>
        <Button height={3} width={6} />
      </Link>
    </>
  );
};

export default HomePage;

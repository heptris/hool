import Error from "components/commons/Error";

const ErrorPage = ({ errorMessage }: { errorMessage: string }) => {
  return <Error errorMessage={errorMessage} />;
};

export default ErrorPage;

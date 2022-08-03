import Error from "components/Error";

const ErrorPage = ({ errorMessage }: { errorMessage: string }) => {
  return <Error errorMessage={errorMessage} />;
};

export default ErrorPage;

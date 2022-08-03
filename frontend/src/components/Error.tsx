import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import { ReactComponent as ErrorCircleImg } from "assets/error-circle-img.svg";
import { ReactComponent as ErrorExclamationImg } from "assets/error-exclamation-img.svg";

import Button from "components/commons/Button";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 4rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const ErrorCirCleImage = styled(ErrorCircleImg)`
  width: 4.5rem;
  height: 4.5rem;
  margin-left: 2rem;
  fill: ${darkTheme.contrastColor};
`;

const ErrorExclamationImage = styled(ErrorExclamationImg)`
  width: 3.5rem;
  height: 3.5rem;
  fill: ${darkTheme.contrastColor};
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`;

const SubTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
`;

const ErrorMessage = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Error = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <Container>
      <ErrorBox>
        <TitleBox>
          <Title>404 Error</Title>
          <ErrorCirCleImage />
          <ErrorExclamationImage />
        </TitleBox>
        <SubTitle>요청하신 페이지를 찾을 수 없습니다.</SubTitle>
        <SubTitle>입력하신 주소가 정확한지 다시 한번 확인해주세요.</SubTitle>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button
          text="이전 페이지로 돌아가기"
          width={20}
          height={3.125}
          fontSize={1.25}
        />
      </ErrorBox>
    </Container>
  );
};

export default Error;

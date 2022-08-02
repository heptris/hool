import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Button from "components/commons/Button";

function EnrollModalBody() {
  return (
    <BodyBox>
      <ImgBox>
        <ImgBtn></ImgBtn>
        <InfoText>*5MB 이내의 png, jpg, gif 파일만 가능합니다.</InfoText>
      </ImgBox>
      <SubmitBtn width={12.5} height={3} text={"제출"} />
    </BodyBox>
  );
}

const BodyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImgBtn = styled.button`
  width: 12.5rem;
  height: 12.5rem;
  background-color: ${darkTheme.adaptiveGrey500};
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background-color: ${darkTheme.adaptiveGrey700};
  }
`;

const InfoText = styled.span`
  font-size: 0.75rem;
  align-self: start;
  color: ${darkTheme.adaptiveGrey200};
  margin-top: 0.3rem;
`;

const SubmitBtn = styled(Button)`
  margin-top: 2rem;
`;

export default EnrollModalBody;

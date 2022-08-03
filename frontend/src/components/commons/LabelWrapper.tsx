import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const LabelWrapper = ({
  htmlFor,
  text,
  info,
}: {
  htmlFor: string;
  text?: string;
  info?: string;
}) => {
  return (
    <FlexBox>
      <Label htmlFor={htmlFor}>{text}</Label>
      {info && (
        <Info>
          <span>{info}</span>
        </Info>
      )}
    </FlexBox>
  );
};

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  font-weight: bold;
  color: ${darkTheme.adaptiveGrey200};
`;
const FlexBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const Info = styled.div`
  font-size: 0.7rem;
  span {
    color: ${darkTheme.infoColor};
  }
`;

export default LabelWrapper;

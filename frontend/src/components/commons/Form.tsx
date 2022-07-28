import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const FormDIV = styled.form``;

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
  color: ${darkTheme.infoColor};
`;

const Input = styled.input`
  width: ${({ widthSize }: PropsType) => widthSize || `19rem`};
  height: 2.8rem;
  font: inherit;
  font-size: 0.875rem;
  padding-left: 1rem;
  border-radius: 4px;
  background-color: ${darkTheme.adaptiveGrey500};
  border: none;
  margin-bottom: 1rem;

  &:focus {
    outline: 2px solid ${darkTheme.mainBadgeColor};
  }
  color: ${darkTheme.adaptiveGrey200};
  ::placeholder {
    color: ${darkTheme.adaptiveGrey200};
    font-size: 0.875rem;
  }
`;

type PropsType = {
  text: string;
  placeholderText: string;
  widthSize: string;
  type: string;
  info: string;
};

const Form = ({ text, placeholderText, widthSize, type, info }: PropsType) => {
  return (
    <FormDIV>
      {info ? (
        <FlexBox>
          <Label htmlFor={placeholderText}>{text}</Label>
          <Info>{info}</Info>
        </FlexBox>
      ) : (
        <Label htmlFor={placeholderText}>{text}</Label>
      )}
      <Input
        type={type}
        id={placeholderText}
        placeholder={placeholderText}
        widthSize={widthSize}
      />
    </FormDIV>
  );
};

export default Form;

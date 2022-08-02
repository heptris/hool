import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import Input from "./Input";

import { FormPropsType } from "types/FormPropsType";

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
  span {
    color: ${darkTheme.infoColor};
  }
`;

const Form = (props: FormPropsType) => {
  const { text, placeholderText, widthSize, type, info } = props;
  return (
    <FormDIV>
      {info ? (
        <FlexBox>
          <Label htmlFor={placeholderText}>{text}</Label>
          <Info>
            <span>{info}</span>
          </Info>
        </FlexBox>
      ) : (
        <Label htmlFor={placeholderText}>{text}</Label>
      )}
      <Input {...props} />
    </FormDIV>
  );
};

export default Form;

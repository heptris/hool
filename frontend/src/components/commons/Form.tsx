import React from "react";
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

const Input = styled.input`
  width: 20rem;
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
};

const Form = (props: PropsType) => {
  return (
    <FormDIV>
      <Label htmlFor="text">{props.text}</Label>
      <Input type="text" id="text" placeholder={props.placeholderText} />
    </FormDIV>
  );
};

export default Form;

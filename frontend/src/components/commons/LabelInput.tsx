import { RefObject } from "react";
import styled from "styled-components";
import { InputStyle } from "styles";

import LabelWrapper from "./LabelWrapper";

type LabelInputPropsType = {
  placeholderText: string;
  text?: string;
  widthSize?: string;
  type?: string;
  info?: string;
  height?: string;
  inputRef?: RefObject<HTMLInputElement>;
  inputOnChange?: Function;
  inputValue?: string;
  id?: string;
  isRequired?: boolean;
};

const LabelInput = (props: LabelInputPropsType) => {
  const {
    text,
    placeholderText,
    widthSize,
    type,
    info,
    height,
    inputRef,
    inputOnChange,
    inputValue,
    id,
    isRequired,
  } = props;
  return (
    <LabelInputDiv {...props}>
      <LabelWrapper
        htmlFor={id ? id : placeholderText}
        text={text}
        info={info}
      />
      <Input
        widthSize={widthSize}
        height={height}
        type={type}
        id={id ? id : placeholderText}
        placeholder={placeholderText}
        ref={inputRef}
        value={inputValue}
        onChange={inputOnChange}
        require={isRequired || false}
      />
    </LabelInputDiv>
  );
};

const LabelInputDiv = styled.div``;
const Input = styled.input.attrs((props) => {
  onChange: Function;
})`
  ${InputStyle}
`;

export default LabelInput;

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
  } = props;
  return (
    <LabelInputDiv {...props}>
      <LabelWrapper htmlFor={placeholderText} text={text} info={info} />
      <Input
        widthSize={widthSize}
        height={height}
        type={type}
        id={placeholderText}
        placeholder={placeholderText}
        ref={inputRef}
        value={inputValue}
        onChange={inputOnChange}
      />
    </LabelInputDiv>
  );
};

const LabelInputDiv = styled.div``;
const Input = styled.input`
  ${InputStyle}
`;

export default LabelInput;

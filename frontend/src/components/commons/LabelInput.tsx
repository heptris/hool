import styled from "styled-components";
import { InputStyle } from "styles/InputStyle";

import LabelWrapper from "./LabelWrapper";

type LabelInputPropsType = {
  placeholderText: string;
  text?: string;
  widthSize?: string;
  type?: string;
  info?: string;
};

const LabelInput = (props: LabelInputPropsType) => {
  const { text, placeholderText, widthSize, type, info } = props;
  return (
    <LabelInputDiv {...props}>
      <LabelWrapper htmlFor={placeholderText} text={text} info={info} />
      <Input widthSize={widthSize} type={type} id={placeholderText} />
    </LabelInputDiv>
  );
};

const LabelInputDiv = styled.div``;
const Input = styled.input`
  ${InputStyle}
`;

export default LabelInput;

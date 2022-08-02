import styled from "styled-components";
import { InputStyle } from "styles/InputStyle";

import LabelWrapper from "./LabelWrapper";

interface LabelTextareaProps {
  placeholderText: string;
  text?: string;
  info?: string;
}

const LabelTextarea = (props: LabelTextareaProps) => {
  const { text, placeholderText, info } = props;
  return (
    <Wrapper>
      <LabelWrapper htmlFor={placeholderText} text={text} info={info} />
      <TextArea id={placeholderText}></TextArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const TextArea = styled.textarea`
  ${InputStyle}
  height: 100%;
  width: 100%;
  padding: 1rem;
  margin: 0;
`;

export default LabelTextarea;

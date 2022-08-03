import styled from "styled-components";
import { InputStyle } from "styles/InputStyle";

import LabelWrapper from "./LabelWrapper";

interface LabelTextareaProps {
  placeholderText: string;
  text?: string;
  info?: string;
  height?: string;
  width?: string;
}

const LabelTextarea = (props: LabelTextareaProps) => {
  const { text, placeholderText, info, height, width } = props;
  return (
    <Wrapper {...props}>
      <LabelWrapper htmlFor={placeholderText} text={text} info={info} />
      <TextArea
        id={placeholderText}
        height={height}
        widthSize={width}
        placeholder={placeholderText}
      ></TextArea>
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
  padding: 1rem;
  margin: 0;
`;

export default LabelTextarea;
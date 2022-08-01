import styled from "styled-components";
import { InputStyle } from "styles/InputStyle";

interface LabelTextProps {
  isInput: boolean;
  contentName: string;
  placeholder?: string;
  widthSize?: string;
  marginRight?: string;
}

const LabelText = ({
  contentName,
  isInput,
  placeholder,
  widthSize,
  marginRight,
}: LabelTextProps) => {
  return (
    <Wrapper>
      <Label htmlFor={contentName}>{contentName}</Label>
      {isInput ? (
        <Input
          id={contentName}
          placeholder={placeholder}
          widthSize={widthSize}
          marginRight={marginRight}
        />
      ) : (
        <TextArea id={contentName}></TextArea>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Label = styled.label`
  margin-bottom: 0.5rem;
`;
const TextArea = styled.textarea`
  ${InputStyle}
  height: 100%;
  width: 100%;
  padding: 1rem;
  margin: 0;
`;
const Input = styled.input<{
  widthSize?: string;
  marginRight?: string;
}>`
  ${InputStyle}
  margin-right: ${({ marginRight }) => marginRight || "0rem"};
  &::placeholder {
    font-size: 0.7rem;
  }
`;
export default LabelText;

import styled from "styled-components";

import { InputStyle } from "components/commons/Form";

const LabelText = ({
  contentName,
  isInput,
  placeholder,
}: {
  isInput: boolean;
  contentName: string;
  placeholder?: string;
}) => {
  return (
    <Wrapper>
      <Label htmlFor={contentName}>{contentName}</Label>
      {isInput ? (
        <Input id={contentName} placeholder={placeholder} />
      ) : (
        <TextArea id={contentName}></TextArea>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  margin-bottom: 0.5rem;
`;
const TextArea = styled.textarea`
  ${InputStyle}
  padding: 1rem;
`;
const Input = styled.input`
  ${InputStyle}
`;
export default LabelText;

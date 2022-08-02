import styled from "styled-components";
import { InputStyle } from "styles/InputStyle";

import { FormPropsType } from "types/FormPropsType";

const Input = (props: FormPropsType) => {
  return <CommonInput placeholder={props.placeholderText} {...props} />;
};

const CommonInput = styled.input`
  ${InputStyle}
`;
export default Input;

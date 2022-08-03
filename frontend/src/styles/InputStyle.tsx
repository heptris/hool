import { css } from "styled-components";
import { darkTheme } from "./Theme";

interface InputType {
  height?: string;
  widthSize?: string;
}

export const InputStyle = css`
  height: ${({ height }: InputType) => height || `2.8rem`};
  width: ${({ widthSize }: InputType) => widthSize || `20rem`};
  font: inherit;
  font-size: 0.875rem;
  padding-left: 1rem;
  border-radius: 4px;
  background-color: ${darkTheme.adaptiveGrey500};
  border: none;
  margin-bottom: 1rem;
  box-sizing: border-box;
  &:focus {
    outline: 2px solid ${darkTheme.mainBadgeColor};
  }
  color: ${darkTheme.adaptiveGrey200};
  ::placeholder {
    color: ${darkTheme.adaptiveGrey200};
    font-size: 0.875rem;
  }
`;

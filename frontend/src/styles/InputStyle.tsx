import { css } from "styled-components";
import { darkTheme } from "./Theme";

import { FormPropsType } from "types/FormPropsType";

export const InputStyle = css`
  width: ${({ widthSize }: FormPropsType) => widthSize || `20rem`};
  height: 2.8rem;
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

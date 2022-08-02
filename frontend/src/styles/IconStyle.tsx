import { css } from "styled-components";
import { darkTheme } from "./Theme";
import { letterSpacingSize } from "styles/GlobalStyle";

export const IconStyle = css`
  font-size: 1rem;
  color: ${darkTheme.adaptiveGrey200};
  margin: 0 ${letterSpacingSize}rem 0 0;
`;

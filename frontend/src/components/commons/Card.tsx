import React, { ReactNode } from "react";
import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const CardDIV = styled.div`
  margin: 2rem auto;
  background: ${({ bgColor }: PropsType) =>
    bgColor || darkTheme.adaptiveGrey700};
  border: 2px solid ${darkTheme.adaptiveGrey700};
  border-radius: 4px;
  border: 1px;
`;
type PropsType = {
  bgColor: string;
  children: ReactNode;
};

const Card = ({ bgColor, children }: PropsType) => {
  return <CardDIV bgColor={bgColor}>{children}</CardDIV>;
};

export default Card;

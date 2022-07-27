import React, { ReactNode } from "react";
import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const CardDIV = styled.div`
  margin: 2rem auto;
  background: ${(props) => props.bgColor || darkTheme.adaptiveGrey700};
  border: 2px solid ${darkTheme.adaptiveGrey700};
  border-radius: 4px;
  border: 1px;
`;
type PropsType = {
  background: string;
  children: ReactNode;
};

const Card = (props: PropsType) => {
  return <CardDIV bgColor={props.background}>{props.children}</CardDIV>;
};

export default Card;

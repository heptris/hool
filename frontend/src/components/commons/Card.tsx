import { ReactNode } from "react";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

type PropsType = {
  children: ReactNode;
  bgColor?: string;
  borderColor?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

const Card = (props: PropsType) => {
  return <CardDiv {...props}>{props.children}</CardDiv>;
};

const CardDiv = styled.div`
  margin-top: ${({ marginTop }: PropsType) => `${marginTop || 0}`}rem;
  margin-right: ${({ marginRight }: PropsType) => `${marginRight || 0}`}rem;
  margin-bottom: ${({ marginBottom }: PropsType) => `${marginBottom || 0}`}rem;
  margin-left: ${({ marginLeft }: PropsType) => `${marginLeft || 0}`}rem;
  background: ${({ bgColor }: PropsType) => bgColor || darkTheme.darkColor};
  border: 1px solid
    ${({ borderColor }: PropsType) => borderColor || darkTheme.adaptiveGrey700};
  border-radius: 4px;
`;

export default Card;

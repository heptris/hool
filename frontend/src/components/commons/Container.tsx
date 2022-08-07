import React from "react";
import styled from "styled-components";
import { darkTheme } from "styles/Theme";

type PropsType = {
  children: React.ReactNode;
};

function Container(props: PropsType) {
  return <ConcreteContainer {...props}>{props.children}</ConcreteContainer>;
}

const ConcreteContainer = styled.div`
  width: 83.333333%;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 1rem 0 2rem 0;
`;

export default Container;

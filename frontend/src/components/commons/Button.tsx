import styled, { StyledComponent } from "styled-components";
import { darkTheme } from "styles/Theme";
import { letterSpacingSize } from "styles/GlobalStyle";

type ButtonProps = {
  text?: string;
  color?: string;
  width: number;
  height: number;
};

/**
 * text, color("main"이 default)를 params로 받아 설정 가능한 Button Element입니다.
 * @param {ButtonProps} props
 * @returns {JSX.Element} Btn
 */

const Button = ({ text = "버튼", color, width, height }: ButtonProps) => {
  return (
    <Btn color={color} width={width} height={height}>
      <span>{text}</span>
    </Btn>
  );
};

export default Button;

const Btn = styled.button`
  border-radius: 4px;
  background-color: ${({ color }) =>
    color ? color : darkTheme.mainBadgeColor};
  width: ${({ width }: ButtonProps) => width}rem;
  height: ${({ height }: ButtonProps) => height}rem;
  line-height: 1;
  cursor: pointer;

  span {
    margin-right: ${letterSpacingSize}rem;
  }

  &:hover {
    background-color: ${({ color }) =>
      color ? darkTheme.emphasisColor : darkTheme.darkBadgeColor};
  }
`;

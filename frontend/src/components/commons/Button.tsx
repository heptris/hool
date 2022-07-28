import styled, { StyledComponent } from "styled-components";
import { darkTheme } from "styles/Theme";

type ButtonProps = {
  text?: string;
  color?: string;
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
};

/**
 * text, color("main"이 default)를 params로 받아 설정 가능한 Button Element입니다.
 * @param {ButtonProps} props
 * @returns {JSX.Element} Btn
 */

const Button = ({
  text = "버튼",
  color,
  width,
  height,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}: ButtonProps) => {
  return (
    <Btn
      color={color}
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      <span>{text}</span>
    </Btn>
  );
};

export default Button;

const Btn = styled.button`
  margin-top: ${({ marginTop }: ButtonProps) =>
    marginTop ? marginTop : "0"}rem;
  margin-bottom: ${({ marginBottom }: ButtonProps) =>
    marginBottom ? marginBottom : "0"}rem;
  margin-left: ${({ marginLeft }: ButtonProps) =>
    marginLeft ? marginLeft : "0"}rem;
  margin-right: ${({ marginRight }: ButtonProps) =>
    marginRight ? marginRight : "0"}rem;

  border-radius: 4px;
  width: ${({ width }: ButtonProps) => width}rem;
  height: ${({ height }: ButtonProps) => height}rem;
  line-height: 1;

  background-color: ${({ color }) =>
    color ? color : darkTheme.mainBadgeColor};
  cursor: pointer;

  span {
    margin-right: 0.08rem;
  }

  &:hover {
    background-color: ${({ color }) =>
      color ? darkTheme.emphasisColor : darkTheme.darkBadgeColor};
  }
`;

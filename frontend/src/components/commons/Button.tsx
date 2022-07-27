import styled from "styled-components";
import { darkTheme } from "styles/Theme";

interface ButtonProps {
  text?: string;
  color?: string;
}

/**
 * text, color("main"이 default)를 params로 받아 설정 가능한 Button Element입니다.
 * @param {ButtonProps} props
 * @returns {HTMLButtonElement} Btn
 */

const Button = ({ text = "버튼", color }: ButtonProps) => {
  return <Btn color={color}>{text}</Btn>;
};

export default Button;

const Btn = styled.button`
  border-radius: 4px;
  background-color: ${({ color }) =>
    color ? color : darkTheme.mainBadgeColor};
  padding: 0.5rem 1rem;
  line-height: 1;
  cursor: pointer;
  &:hover {
    background-color: ${({ color }) =>
      color ? darkTheme.darkColor : darkTheme.darkBadgeColor};
  }
`;

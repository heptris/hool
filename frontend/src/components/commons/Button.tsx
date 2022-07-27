import styled from "styled-components";
import { darkTheme } from "styles/Theme";

interface ButtonProps {
  text?: string | HTMLImageElement;
  color?: string;
  isSqr?: boolean;
}

/**
 * text, color("main"이 default)를 params로 받아 설정 가능한 Button Element입니다.
 * @param {ButtonProps} props
 * @returns {HTMLButtonElement} Btn
 */

const Button = ({ text, color, isSqr = false }: ButtonProps) => {
  return (
    <Btn color={color} isSqr={isSqr}>
      {typeof text === "string"?}
    </Btn>
  );
};

export default Button;

const Btn = styled.button`
  border-radius: 4px;
  background-color: ${({ color }) =>
    color ? color : darkTheme.mainBadgeColor};
  padding: ${({ isSqr }) => (isSqr ? "0.5rem" : "0.5rem 1rem")};
  line-height: 1;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.color === "grey"
        ? darkTheme.adaptiveGrey700
        : darkTheme.darkBadgeColor};
  }
`;

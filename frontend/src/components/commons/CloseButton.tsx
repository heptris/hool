import styled from "styled-components";

const CloseButton = ({ onDisplayChange }: { onDisplayChange: Function }) => {
  return (
    <CloseBtn onClick={onDisplayChange}>
      <span className="fa-solid fa-xmark" />
    </CloseBtn>
  );
};

const CloseBtn = styled.button.attrs((props) => {
  onClick: Function;
})`
  font-size: 1.5rem;
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: transparent;
`;

export default CloseButton;

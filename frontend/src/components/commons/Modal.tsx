import { ReactElement, useState } from "react";

import styled from "styled-components";
import { darkTheme } from "../../styles/Theme";

type PropsType = {
  header: ReactElement;
  body: ReactElement;
  onDisplayChange: Function;
};

function Modal({ header, body, onDisplayChange }: PropsType) {
  const handleDisplayChange = () => {
    onDisplayChange();
  };

  return (
    <ModalWindow>
      <ModalComponent>
        <ModalHeader>
          {header}
          {/* <CloseBtn onClick={handleDisplayChange}>
              <i className="fa-solid fa-xmark"></i>
            </CloseBtn> */}
        </ModalHeader>

        <Hr />

        <ModalBody>{body}</ModalBody>
      </ModalComponent>
      <Wrapper
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          handleDisplayChange();
        }}
      ></Wrapper>
    </ModalWindow>
  );
}

const Wrapper = styled.div`
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9990;
`;

const ModalWindow = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9991;
`;

const ModalComponent = styled.div`
  border-radius: 4px;
  background-color: ${darkTheme.mainColor};
  z-index: 9992;
`;

const ModalHeader = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
`;

// const CloseBtn = styled.button`
//   background-color: transparent;

//   &:hover {
//     cursor: pointer;

//     i {
//       color: ${darkTheme.adaptiveGrey200};
//     }
//   }
// `;

const Hr = styled.hr`
  border: 1px solid ${darkTheme.adaptiveGrey700};
  background-color: ${darkTheme.adaptiveGrey700};
`;

const ModalBody = styled.div`
  padding: 0 1rem;
`;

export default Modal;

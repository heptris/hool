import { ReactElement, useState } from "react";

import styled from "styled-components";
import { darkTheme } from "../../styles/Theme";

type PropsType = {
  header: ReactElement;
  body: ReactElement;
};

function Modal({ header, body }: PropsType) {
  return (
    <Wrapper>
      <ModalWindow>
        <ModalComponent>
          <ModalHeader>
            {header}
            <CloseBtn>
              <i className="fa-solid fa-xmark"></i>
            </CloseBtn>
          </ModalHeader>

          <Hr />

          <ModalBody>{body}</ModalBody>
        </ModalComponent>
      </ModalWindow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  background-repeat: repeat;
  position: fixed;
`;

const ModalWindow = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalComponent = styled.div`
  width: 30vw;
  height: 30vh;
  border-radius: 4px;
  background-color: ${darkTheme.mainColor};
`;

const ModalHeader = styled.div`
  margin: 2rem;
  display: flex;
  justify-content: space-between;
`;

const CloseBtn = styled.button`
  background-color: transparent;

  &:hover {
    cursor: pointer;

    i {
      color: ${darkTheme.adaptiveGrey200};
    }
  }
`;

const Hr = styled.hr`
  border: 1px solid ${darkTheme.adaptiveGrey700};
  background-color: ${darkTheme.adaptiveGrey700};
`;

const ModalBody = styled.div`
  margin: 2rem;
`;

export default Modal;

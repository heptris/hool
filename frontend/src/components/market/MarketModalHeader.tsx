import React from "react";
import styled from "styled-components";

const MarketModalHeader = ({
  onDisplayChange,
}: {
  onDisplayChange: Function;
}) => {
  return (
    <Header>
      <TitleWrapper>
        <Title>이모지 상점 등록</Title>
        <SubTitle>
          직접 제작한 이모지를 판매해 포인트를 얻을 수 있어요!
        </SubTitle>
      </TitleWrapper>
      <CloseButton onClick={onDisplayChange}>
        <Icon className="fa-solid fa-xmark" />
      </CloseButton>
    </Header>
  );
};
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  font-size: 2rem;
`;
const SubTitle = styled.p`
  margin-top: 0.5rem;
`;
const Header = styled.div`
  padding: 2rem 1rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CloseButton = styled.button.attrs((props) => {
  onClick: Function;
})`
  font-size: 1rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: transparent;
`;
const Icon = styled.i`
  font-size: 2rem;
`;
export default MarketModalHeader;

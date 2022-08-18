import { ReactNode } from "react";
import styled from "styled-components";
import { darkTheme } from "styles/Theme";

type PropsType = {
  pageTitle: string;
  subtext: string;
  isDisplaySearchBar: boolean;
  isDisplayBtn: boolean;
  concreteBtn?: React.ReactElement;
  isDisplayInfo: boolean;
  concreteInfo?: React.ReactElement;
  SearchBar?: React.ReactElement;
  children?: ReactNode;
};

function PageHeader(props: PropsType) {
  const {
    pageTitle,
    subtext,
    isDisplaySearchBar,
    isDisplayBtn,
    concreteBtn,
    isDisplayInfo,
    concreteInfo,
    SearchBar,
  } = props;

  return (
    <Header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HeaderText>{pageTitle}</HeaderText>
        {isDisplaySearchBar && <>{SearchBar}</>}
      </div>

      <SubText>{subtext}</SubText>

      <UtilBox>
        {isDisplayInfo && <>{concreteInfo}</>}
        {isDisplayBtn && <>{concreteBtn}</>}
      </UtilBox>
      {props.children}
      <Hr />
    </Header>
  );
}

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderText = styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  margin: 0 0 2rem 0;
`;

const SubText = styled.span`
  font-size: 1.25rem;
  color: ${darkTheme.adaptiveGrey200};
  margin: 0 0 4rem 0;
`;

const UtilBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Hr = styled.hr`
  border: 1px solid ${darkTheme.adaptiveGrey700};
  background-color: ${darkTheme.adaptiveGrey700};
  width: 100%;
  margin: 0;
`;

export default PageHeader;

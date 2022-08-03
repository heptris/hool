import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import SearchBar from "./SearchBar";

type PropsType = {
  pageTitle: string;
  subtext: string;
  isDisplaySearchBar: boolean;
  searchPlaceholder?: string;
  isDisplayBtn: boolean;
  concreteBtn?: React.ReactElement;
  isDisplayInfo: boolean;
  concreteInfo?: React.ReactElement;
};

function PageHeader(props: PropsType) {
  const {
    pageTitle,
    subtext,
    isDisplaySearchBar,
    searchPlaceholder,
    isDisplayBtn,
    concreteBtn,
    isDisplayInfo,
    concreteInfo,
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
        {isDisplaySearchBar && (
          <SearchBar searchPlaceholder={searchPlaceholder} />
        )}
      </div>

      <SubText>{subtext}</SubText>

      <UtilBox>
        {isDisplayInfo && <>{concreteInfo}</>}
        {isDisplayBtn && <>{concreteBtn}</>}
      </UtilBox>
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
  font-size: 2.5rem;
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

// const SearchBar = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: ${darkTheme.adaptiveGrey500};
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   width: 16rem;
//   height: 2rem;

//   &:focus-within {
//     outline: 2px solid ${darkTheme.mainBadgeColor};
//   }
// `;

// const MagIcon = styled.i`
//   color: ${darkTheme.adaptiveGrey200};
// `;

// const SearchInput = styled.input`
//   background-color: transparent;
//   border: 0;
//   width: 100%;
//   padding-left: 1rem;
//   font: inherit;
//   font-size: 0.875rem;
//   color: ${darkTheme.adaptiveGrey200};

//   &:focus {
//     outline: none;
//   }

//   ::placeholder {
//     color: ${darkTheme.adaptiveGrey200};
//   }
// `;

const Hr = styled.hr`
  border: 1px solid ${darkTheme.adaptiveGrey700};
  background-color: ${darkTheme.adaptiveGrey700};
  width: 100%;
  margin: 0;
`;

export default PageHeader;

import styled from "styled-components";
import { darkTheme, InputStyle } from "styles";

const SearchBar = (props: {
  searchPlaceholder?: string;
  widthSize?: string;
  inputOnChange?: Function;
  inputValue: string;
}) => {
  const { searchPlaceholder, widthSize, inputValue, inputOnChange } = props;
  return (
    <Wrapper {...props}>
      <MagIcon
        className="fa-solid fa-magnifying-glass"
        htmlFor={searchPlaceholder}
      />
      <ConcreteInput
        placeholder={searchPlaceholder}
        id={searchPlaceholder}
        widthSize={widthSize}
        value={inputValue}
        onChange={inputOnChange}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
`;

const MagIcon = styled.label`
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: ${darkTheme.adaptiveGrey200};
`;

const ConcreteInput = styled.input.attrs((props) => {
  onChange: Function;
})`
  ${InputStyle}
  margin: 0;
  padding-left: 3rem;
`;

export default SearchBar;

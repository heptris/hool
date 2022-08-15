import { ChangeEvent } from "react";
import styled from "styled-components";
import { darkTheme } from "styles";

const { adaptiveGrey200, adaptiveGrey500 } = darkTheme;

const SelectCategory = (props: {
  conferenceCategory: string;
  onChange: Function;
}) => {
  const { conferenceCategory, onChange } = props;
  return (
    <Select
      name="choice"
      value={conferenceCategory}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onChange("conferenceCategory", e)
      }
    >
      <Option defaultValue={"DEFAULT"}>선택하세요</Option>
      <Option value="SOCCER">축구</Option>
      <Option value="BASEBALL">야구</Option>
      <Option value="BASKETBALL">농구</Option>
      <Option value="VOLLEYBALL">배구</Option>
      <Option value="ESPORTS">E-Sports</Option>
    </Select>
  );
};

const Select = styled.select`
  width: 100%;
  height: 2.5rem;
  background-color: ${adaptiveGrey500};
  border-radius: 4px;
  color: ${adaptiveGrey200};
  padding: 0 1rem;
  font-family: "Noto Sans KR", sans-serif;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
const Option = styled.option`
  &:hover {
    cursor: pointer;
  }
`;

export default SelectCategory;

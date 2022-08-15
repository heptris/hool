import { useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";
import { darkTheme } from "styles";

import { QUERY_KEYS } from "constant";

import PageHeader from "components/commons/PageHeader";
import Button from "components/commons/Button";
import { UserInfoType } from "types/UserInfoType";

// const MarketSearchBar = () => {
//   const [searchEmojiItem, setSearchEmojiItem] = useState("");
//   // const postSearchMutation = useMutation(postSearchFriend);
//   // const { mutate, isSuccess, isError, data } = postSearchMutation;

//   const handleSearchEmojiItem = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchEmojiItem(e.target.value);
//   };
//   // useEffect(() => {
//   //   mutate({ friendNickEmojiItem: searchEmojiItem });
//   // }, [searchEmojiItem]);
//   // console.log(postSearchMutation);

//   return (
//     <>
//       <SearchBar
//         inputValue={searchEmojiItem}
//         searchPlaceholder="이모지 검색"
//         inputOnChange={handleSearchEmojiItem}
//         // mutationProps={}
//       />
//     </>
//   );
// };
const MarketHeader = ({ onDisplayChange }: { onDisplayChange: Function }) => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<UserInfoType>([QUERY_KEYS.USER]);

  return (
    <PageHeader
      pageTitle="이모지 구매"
      subtext="친구가 만든 이모지를 구경하러 가볼까요?"
      isDisplaySearchBar={true}
      isDisplayBtn={true}
      // SearchBar={<MarketSearchBar />}
      concreteBtn={
        <MarketButton
          height={2.8}
          width={7}
          text={"상품등록"}
          onClick={onDisplayChange}
        />
      }
      isDisplayInfo={true}
      concreteInfo={
        <MyPointBox>
          <div>보유 중인 큐브</div>
          <MyPoint>
            <i className="fa-solid fa-cube"></i>
            <span>
              {Number(userInfo?.point)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </MyPoint>
        </MyPointBox>
      }
    />
  );
};
const MyPointBox = styled.div``;
const MyPoint = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;

  i {
    margin-right: 0.5rem;
    color: ${darkTheme.emphasisColor};
  }
`;
const MarketButton = styled(Button)<{ onClick: Function }>``;

export default MarketHeader;

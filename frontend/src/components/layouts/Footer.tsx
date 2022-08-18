import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { setIsInview } from "store";
import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const Footer = () => {
  const { ref, inView } = useInView();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsInview(inView));
  }, [inView]);
  return (
    <FooterBox>
      <FooterContent>
        <FooterItems>
          <div>
            <h1>서비스</h1>
            <ul>
              <li>공지사항</li>
            </ul>
          </div>
          <div>
            <h1>문의</h1>
            <ul>
              <li>사이트 개선 제안</li>
              <li>피해신고</li>
            </ul>
          </div>
          <div>
            <h1>연락처</h1>
            <ul>
              <li>hanndrednine@gmail.com</li>
            </ul>
          </div>
        </FooterItems>
        <div>
          A408
          <br />
          <h2>한승재, 박상태, 신은정, 안호진, 이승호, 전한울</h2>
          <h3>06220 서울특별시 강남구 테헤란로 212 (역삼동)</h3>
        </div>
      </FooterContent>
      <div ref={ref} />
    </FooterBox>
  );
};

const FooterBox = styled.footer`
  width: 75%;
  height: 50vh;
  background-color: #121520;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 25%;
`;

const FooterContent = styled.div`
  color: ${darkTheme.adaptiveGrey500};
  display: flex;
  flex-direction: column;

  div {
    color: ${darkTheme.adaptiveGrey200};

    h2 {
      margin: 1rem 0 0 0;
      color: ${darkTheme.adaptiveGrey500};
      font-size: 0.875rem;
      font-weight: normal;
    }

    h3 {
      margin: 0.8rem 0 0 0;
      color: ${darkTheme.adaptiveGrey500};
      font-size: 0.75rem;
      font-weight: normal;
    }
  }
`;

const FooterItems = styled.div`
  display: flex;
  width: 180%;
  justify-content: space-between;
  margin: 0 0 3rem 0;

  div {
    h1 {
      color: ${darkTheme.adaptiveGrey200};
    }

    ul {
      margin: 1rem 0 0 0;

      li {
        color: ${darkTheme.adaptiveGrey500};
        margin: 0 0 1rem 0;

        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
`;

export default Footer;

import styled from "styled-components";
import NavHeader from "./NavHeader";
import NavSide from "./NavSide";

const Navbar = () => {
  return (
    <Nav>
      <NavSide />
      <NavHeader />
    </Nav>
  );
};

const Nav = styled.header`
  display: flex;
  width: 95vw;
  position: fixed;
`;

export default Navbar;

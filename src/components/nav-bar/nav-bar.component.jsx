import styled from 'styled-components';

import {Link, Outlet} from 'react-router-dom';


const NavContainer = styled.div`
  display:flex;
  width:100%;
  background-color: #333;
`;

const NavElement = styled.div`
  margin-left:1.5rem
`;

const Nav = styled.nav`
  color: white;
  padding: 20px;
  text-align: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 0 10px;
  font-weight: bold;

  &:hover{
    background-color: #555;
  }
`;


const NavBar = () => {
  return (
    <>
      <NavContainer>
        <Nav>
          logo
        </Nav>
        <NavElement>
          <Nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/loves'>loves</NavLink>
          </Nav>
        </NavElement>

      </NavContainer >
      <Outlet />
    </>


  );
};

export default NavBar;

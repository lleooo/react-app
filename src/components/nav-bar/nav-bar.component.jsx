import styled from "styled-components";
import InputBox from "../../components/input-box/input-box.component";

import {Link, Outlet, useLocation} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import {fetchSearchMovie} from "../../utils/tmdb/tmdb.utils";
import UserProfile from "../user-profile/user-profile.component";
import logo from "../../assets/crown.svg";

import {DarkThemeToggle, Navbar} from "flowbite-react";


const NavContainer = styled.div`
  display: flex;
  width: 100%;
  height: 8%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 83%);
  position: fixed;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: rgba(128, 128, 128, 0.5);
  }
`;

const NavElement = styled.div`
  margin-left: 1.5rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
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
`;

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const timer = useRef();
  const location = useLocation();
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };


  useEffect(() => {
    if (searchTerm !== "") {
      timer.current = setTimeout(async () => {
        const res = await fetchSearchMovie(searchTerm);
        setSuggestion(res);
        timer.current = null;
      }, 500);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [searchTerm, location.pathname]);

  if (location.pathname === "/movies/popular") {
    return (
      <>
        <NavContainer>
          <Logo><img src={logo} alt="" /></Logo>
          <NavElement>
            <Nav>
              <NavLink to="/movies">Home</NavLink>
              <NavLink to="/movies/popular">Popular</NavLink>
              <NavLink to="/movies/loves">loves</NavLink>
            </Nav>
          </NavElement>
          <div className=" absolute right-0 w-4/12 h-full flex items-center justify-evenly">
            <InputBox
              onChange={(e) => handleChange(e)}
              suggestion={suggestion}
              searchTerm={searchTerm}
            ></InputBox>
            <UserProfile></UserProfile>
          </div>
        </NavContainer>
        <Outlet />
      </>
    );
  }

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <UserProfile></UserProfile>
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/movies">Home</Navbar.Link>
          <Navbar.Link href="/movies/popular">Popular</Navbar.Link>
          <Navbar.Link href="/movies/loves">Loves</Navbar.Link>
        </Navbar.Collapse>
        <DarkThemeToggle />
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavBar;

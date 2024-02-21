import {VscAccount} from "react-icons/vsc";
import {IoIosPower} from "react-icons/io";
import {FaHeart} from "react-icons/fa";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {logoutAsync} from "../../store/jwt-token/token.action";
import {useState} from "react";

const Container = styled.div`
    width:15%;
    height:100%;
    text-align:center;
    position:relative;
`;

const DropdownContainer = styled.div`
    position:absolute;
    top:0;
    width:200px;
    height:350px;
    background:white;
`;
const ProfileDropdownContainer = styled.div`
    background-color: #f9f9f9;
    position:absolute;
    top:100%;
    right:0;
    border-radius: .5rem;
    display:none;

    &.show{
        display:block
    }
`;

const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content:space-evenly;
    cursor: pointer;
`;
const UserBtn = styled.button`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: none;
    border: none;
`;
const UserInfo = styled.div`
    display:flex;
    flex-direction:column;
`;
const UserName = styled.span`
    font-size:1.3rem;
`;
const UserEmail = styled.span`
    font-size:.8rem;
    color:gray
`;

const DropdownContent = styled.div`
  background-color: #f9f9f9;
  min-width: 175px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: .5rem;
`;

const MenuItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const UserProfile = () => {
    const user = useSelector(state => state.user);
    const [toggleProfile, settoggleProfile] = useState(false);
    const dispatch = useDispatch();

    const toggleProfileDropdown = () => {
        settoggleProfile(!toggleProfile);
    };

    return (
        <Container>
            <UserBtn onClick={() => toggleProfileDropdown()}>
                <VscAccount style={{fontSize: '45px'}} />
            </UserBtn>

            <ProfileDropdownContainer className={toggleProfile ? 'show' : ''}>
                <ProfileInfo>
                    <div>
                        <VscAccount style={{fontSize: '30px'}} />
                    </div>
                    <UserInfo>
                        <UserName>
                            {user.username}
                        </UserName>
                        <UserEmail>
                            {user.email}
                        </UserEmail>
                    </UserInfo>
                </ProfileInfo>
                <DropdownContent>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem><FaHeart style={{fontSize: '15px', marginRight: '1.2rem'}} />My Profile</MenuItem>
                    <MenuItem onClick={() => dispatch(logoutAsync())}><IoIosPower style={{fontSize: '15px', marginRight: '1.2rem'}} />Logout</MenuItem>
                </DropdownContent>
            </ProfileDropdownContainer>
        </Container>
    );
};

export default UserProfile;

import {useDispatch, useSelector} from "react-redux";
import {logoutAsync} from "../../store/jwt-token/token.action";

import {Avatar, Dropdown} from "flowbite-react";

const UserProfile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    // console.log(user);
    return (
        <div className="flex md:order-2">
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                }
            >
                <Dropdown.Header>
                    <span className="block text-sm">{user.username}</span>
                    <span className="block truncate text-sm font-medium">{user.email}</span>
                </Dropdown.Header>
                <Dropdown.Item>Favorite</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => dispatch(logoutAsync())}>Sign out</Dropdown.Item>
            </Dropdown>
        </div>
        // <Container>

        //     <UserBtn onClick={() => toggleProfileDropdown()}>
        //         <VscAccount style={{fontSize: '45px'}} />
        //     </UserBtn>

        //     <ProfileDropdownContainer className={toggleProfile ? 'show' : ''}>
        //         <ProfileInfo>
        //             <div>
        //                 <VscAccount style={{fontSize: '30px'}} />
        //             </div>
        //             <UserInfo>
        //                 <UserName>
        //                     {user.username}
        //                 </UserName>
        //                 <UserEmail>
        //                     {user.email}
        //                 </UserEmail>
        //             </UserInfo>
        //         </ProfileInfo>
        //         <DropdownContent>
        //             <MenuItem>Settings</MenuItem>
        //             <MenuItem><FaHeart style={{fontSize: '15px', marginRight: '1.2rem'}} />My Profile</MenuItem>
        //             <MenuItem onClick={() => dispatch(logoutAsync())}><IoIosPower style={{fontSize: '15px', marginRight: '1.2rem'}} />Logout</MenuItem>
        //         </DropdownContent>
        //     </ProfileDropdownContainer>

        // </Container>
    );
};

export default UserProfile;

import {useDispatch, useSelector} from "react-redux";
import {logoutAsync} from "../../store/user/user.action";

import {Avatar, Dropdown} from "flowbite-react";

const UserProfile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

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
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => dispatch(logoutAsync())}>Sign out</Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default UserProfile;

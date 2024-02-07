import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginFail, loginSuccess, refreshTokenAsync} from "../../store/jwt-token/token.action";
import {useNavigate} from "react-router-dom";

const Loves = (movies) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {login, access_token, refresh_token} = useSelector(state => state.user);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const request = fetch('/api/getlove', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json', // 根据请求的内容类型添加其他头部
            },
        });

        request.then(response => {
            return response.json();
        }).then((res) => {
            if (res.msg === 'success') {
                setFavoriteMovies(res.favorite);
            } else if (res.msg === 'expired') {
                dispatch(refreshTokenAsync()).then((res) => {
                    if (res === 'fail') navigate('/login');
                });
            }
        });
    }, []);
    return (
        <div>
            {login ? "嗨你登入了你可以看" + favoriteMovies : "你沒登入不能看"}
        </div>

    );
};

export default Loves;
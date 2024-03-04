import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginFail, loginSuccess, refreshTokenAsync, removeFavoriteSuccess} from "../../store/jwt-token/token.action";
import {useNavigate} from "react-router-dom";
import {IoCloseSharp} from "react-icons/io5";

import MovieCard from "../../components/movie-card/moive-card.component";
import styled from "styled-components";


const FavoriteContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
`;

const Loves = (movies) => {
    console.log('render');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    // useEffect(() => {
    //     const request = fetch('/api/getlove', {
    //         method: "GET",
    //         headers: {
    //             'Authorization': `Bearer ${access_token}`,
    //             'Content-Type': 'application/json', // 根据请求的内容类型添加其他头部
    //         },
    //     });

    //     request.then(response => {
    //         return response.json();
    //     }).then((res) => {
    //         if (res.msg === 'success') {
    //             setFavoriteMovies(res.favorite);
    //         } else if (res.msg === 'expired') {
    //             dispatch(refreshTokenAsync()).then((res) => {
    //                 if (res === 'fail') navigate('/login');
    //             });
    //         }
    //     });
    // }, []);

    useEffect(() => {
        const response = user.favorite.map(async (id) => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US`);
            const data = await res.json();
            return data;
        });

        Promise.all(response).then(data => {
            setFavoriteMovies(data);
        });
    }, []);


    const removeFavorite = async (id) => {
        const res = await fetch('/api/removeFavorite', {
            method: "DELETE",
            headers: {
                'X-CSRF-TOKEN': user.access_token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': user.username,
                'movieID': id
            })
        });
        const rmFavoriteRes = await res.json();

        switch (rmFavoriteRes.msg) {
            case "success":
                dispatch(removeFavoriteSuccess({...user, 'favorite': rmFavoriteRes.data}));
                setFavoriteMovies((preFavorite) => preFavorite.filter(movie => movie.id !== id));
                break;
            case "access expired":
                // dispatch(refreshTokenAsync(user));
                break;
            default:
                break;
        }
    };


    return (
        <FavoriteContainer>
            <div style={{
                marginTop: '15rem',
                background: 'red',
                width: '90%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
            }}>
                {favoriteMovies.map((movie) => {
                    return <div key={movie.id} style={{position: 'relative'}}>
                        <IoCloseSharp style={{fontSize: '3rem', position: 'absolute', left: '', color: "red", zIndex: '1'}} onClick={() => {removeFavorite(movie.id);}} />
                        <MovieCard detail={movie} activeCard={false} clickEvent={() => {console.log('love');}}></MovieCard>
                    </div>;

                })}
            </div>
        </FavoriteContainer>
    );
};

export default Loves;
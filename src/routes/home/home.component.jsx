import {useCallback, useEffect, useState} from "react";
import MovieCardList from "../../components/movie-card-list/movie-card-list.component";
import useMovies from "../../custom-hooks/useMovies";
import FilterCardComponent from "../../components/filter-card/filter-card.component";

const Home = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [moviesFilterByGenre, setMoviesFilterByGenre] = useState([]);
    const [selected, setSelected] = useState([]);
    const [listType, setListType] = useState('popular');
    const {data} = useMovies(listType, page);//fetch movies api

    const genreClick = (e) => {
        const ele = e.target.tagName;
        const genreId = ele === "BUTTON" ? Number(e.target.id) : Number(e.target.parentNode.id);
        const genreName = ele === "BUTTON" ? e.target.value : e.target.parentNode.value;
        const exists = (element) => element.id === genreId;
        let existIdx = selected.findIndex(exists);//如果等於-1就代表沒有
        if (existIdx !== -1) {
            setSelected(pre => pre.filter((item, idx) => idx !== existIdx));
        } else {
            setSelected(pre => [...pre, {id: genreId, name: genreName}]);
        }
    };

    //切換listType一律從第一頁開始顯示
    useEffect(() => {
        setPage(1);
    }, [listType]);

    //data更新時檢查page是否有變，有就繼續顯示下一頁電影資料
    useEffect(() => {
        if (data) {
            if (page === 1) {
                setMovies([...data]);
            } else {
                setMovies(pre => [...pre, ...data]);
            }
        }
    }, [data]);

    //選擇genres時根據當前movies篩選對應電影
    useEffect(() => {
        const selectedID = selected.map(item => item.id);
        const moviesFilterByGenre = movies.filter(movie => {
            const matchGenre = selectedID.every(genre => movie.genre_ids.includes(genre));
            return matchGenre;
        });
        setMoviesFilterByGenre([...moviesFilterByGenre]);
    }, [selected]);


    //add useCallback to prevent handleScroll re-create while Home re-render
    const handleScroll = useCallback(() => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const bodyHeight = document.body.offsetHeight;
        if (windowHeight + scrollY + 1 >= bodyHeight) {
            setPage((pre) => pre + 1);
        }
    }, []);

    useEffect(() => {
        if (selected.length === 0) {
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll, selected]);
    return (
        <div className="flex justify-center bg-white">
            <FilterCardComponent selected={selected} genersClickEvent={genreClick} setListType={setListType} />
            <MovieCardList movies={selected.length === 0 ? movies : moviesFilterByGenre} path={'home'} page={page} />
        </div>

    );
};

export default Home;

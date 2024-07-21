import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import {fetchPopularMovie} from "../utils/tmdb/tmdb.utils";


const useGetPopularMovies = (page) => {
    const {isPending, error, data} = useQuery({
        queryKey: ['page', page],
        queryFn: () => fetchPopularMovie(page).then((res) =>
            res.json()
        ).then(res => res.results)
    });

    return {isPending, error, data};
};

export default useGetPopularMovies;

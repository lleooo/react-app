import {useQuery} from "@tanstack/react-query";
import {getMovies} from "../utils/tmdb/tmdb.utils";


const useMovies = (listType = "popular", page = 1) => {
    const {isPending, error, data} = useQuery({
        queryKey: ['listType', listType, 'page', page],
        queryFn: () => getMovies(listType, page).then((res) =>
            res.json()
        ).then(res => res.results),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10
    });

    return {isPending, error, data};
};

export default useMovies;
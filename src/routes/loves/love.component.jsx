import React from "react";
// import {useEffect, useState} from "react";
// import {useDispatch, useSelector}from "react-redux";
// import store from "../../store/store";
import {connect} from "react-redux";
import MovieCardList from "../../components/movie-card-list/movie-card-list.component";

class Loves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteMovies: [],
      finishFetch: false,
    };
  }

  //only called once
  componentDidMount() {
    const {favorite} = this.props;

    const favoriteData = favorite.map(async (id) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US`);
      const movieData = await res.json();
      return movieData;
    });

    Promise.all(favoriteData).then((movieData) => {
      this.setState({favoriteMovies: [...movieData]});
      setTimeout(() => {
        this.setState({finishFetch: true});
      }, 500);
    });
  }

  //manage logic in componentDidUpdate
  //should usually be wrapped in conditions to avoid creating infinite loops
  componentDidUpdate(prevProps) {
    if (prevProps.favorite.length !== this.props.favorite.length) {
      const newFavoriteArr = this.state.favoriteMovies.filter((movie) => {
        return this.props.favorite.includes(movie.id);
      });
      this.setState({favoriteMovies: [...newFavoriteArr]});
    }
  }

  removeFavorite(id) {

    this.props.removeFavoriteMovie(id);
  }

  render() {
    const {favoriteMovies, finishFetch} = this.state;

    return finishFetch ? <MovieCardList movies={favoriteMovies} buttonType={'love'} /> : <MovieCardList showSkeleton={true} buttonType={'love'} />;
  }
}

const mapStateToProps = (state) => {
  return {
    favorite: state.user.favorite,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFavoriteMovie: (id) => dispatch({type: "REMOVE_FAVORITE_MOVIE", payload: id}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loves);

// ================= Loves component create by function ================= //
//Loves component create by function

// const Loves = () => {
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.user);
//     const [favoriteMovies, setFavoriteMovies] = useState([]);

//     useEffect(() => {
//         const response = user.favorite.map(async (id) => {
//             const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US`);
//             const data = await res.json();
//             return data;
//         });

//         Promise.all(response).then(data => {
//             setFavoriteMovies(data);
//         });
//     }, [user]);

//     const removeFavorite = async (id) => {
//         dispatch({type: 'REMOVE_FAVORITE_MOVIE', payload: id});
//     };

//     return (
//         <FavoriteContainer>
//             <div style={{
//                 marginTop: '15rem',
//                 background: 'red',
//                 width: '90%',
//                 position: 'relative',
//                 display: 'flex',
//                 justifyContent: 'center'
//             }}>
//                 {favoriteMovies.map((movie) => {
//                     return <div key={movie.id} style={{position: 'relative'}}>
//                         <IoCloseSharp style={{fontSize: '3rem', position: 'absolute', left: '', color: "red", zIndex: '1'}} onClick={() => {removeFavorite(movie.id);}} />
//                         <MovieCard detail={movie} activeCard={false} clickEvent={() => {console.log('love');}}></MovieCard>
//                     </div>;

//                 })}
//             </div>
//         </FavoriteContainer>
//     );
// };

// export default Loves;
// ================= Loves component create by function (end) ================= //

// ==== redux with class component ====//
//https://ithelp.ithome.com.tw/articles/10187762

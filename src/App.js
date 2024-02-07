import {useDispatch, useSelector} from 'react-redux';

import {getMonsterAsync} from './store/monster/monster.action';
import NavBar from './components/nav-bar/nav-bar.component';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import Home from './routes/home/home.component';
import Loves from './routes/loves/love.component';
import Detail from './routes/movie-detail/moive-detail.component';
import Search from './routes/search/search.component';
import Login from './routes/login/login.component';


function App() {
  const dispatch = useDispatch();
  const monsters = useSelector(state => state.monster);

  useEffect(() => {
    dispatch(getMonsterAsync());
  }, []);

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<NavBar />}>
          <Route index element={<Home movies={monsters} />} />
          <Route path='loves' element={<Loves />} />
          <Route path='search' element={<Search />} />
          <Route path='login' element={<Login />}></Route>
          <Route path='movieDatil' element={<Detail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

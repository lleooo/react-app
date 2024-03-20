import {createGlobalStyle} from 'styled-components';

import NavBar from './components/nav-bar/nav-bar.component';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Popular from './routes/popular/popular.component';
import Home from './routes/home/home.component';
import Loves from './routes/loves/love.component';
import Detail from './routes/movie-detail/moive-detail.component';
import Auth from './routes/auth/auth.component';
import PrivateRouteComponent from './routes/private-route/private-route.component';

import font1 from '../src/assets/fonts/PermanentMarker-Regular.ttf';
import font2 from '../src/assets/fonts/ProtestRevolution-Regular.ttf';
import font3 from '../src/assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MovieTitle';
    src: url(${font2}) format('woff2');
  }

  @font-face{  
    font-family:'body';
    src:url(${font3}) format('woff');
  }
  
  body {
    font-family: sans-serif;
  }
`;

function App() {
  return (
    <div className='app'>
      <GlobalStyle></GlobalStyle>
      <Routes>
        <Route path='/' element={<NavBar />}>
          <Route path='movies' element={<PrivateRouteComponent Component={Home} />} />
          <Route path='movies/popular' element={<PrivateRouteComponent Component={Popular} />} />
          <Route path='movies/loves' element={<PrivateRouteComponent Component={Loves} />} />
          <Route index element={<Auth />}></Route>
          <Route path='/movies/:id' element={<Detail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

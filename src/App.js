import {createGlobalStyle} from 'styled-components';

import NavBar from './components/nav-bar/nav-bar.component';
import {Route, Routes} from 'react-router-dom';
import Popular from './routes/popular/popular.component';
import Home from './routes/home/home.component';
import Loves from './routes/loves/love.component';
import Detail from './routes/movie-detail/moive-detail.component';
import Auth from './routes/auth/auth.component';
import PrivateRouteComponent from './routes/private-route/private-route.component';

import font2 from '../src/assets/fonts/ProtestRevolution-Regular.ttf';
import font3 from '../src/assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf';

import {GoogleOAuthProvider} from '@react-oauth/google';

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
    <GoogleOAuthProvider clientId="54532982628-dmk3e53gfh1djcel7htm5pkiq3h85u9g.apps.googleusercontent.com">
      <div className='app'>
        <GlobalStyle></GlobalStyle>
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route path='movies' element={<PrivateRouteComponent Component={Home} />} />
            <Route path='movies/popular' element={<PrivateRouteComponent Component={Popular} />} />
            <Route path='movies/loves' element={<PrivateRouteComponent Component={Loves} />} />
            <Route path='/movies/:id' element={<Detail />} />
          </Route>
          <Route index element={<Auth />}></Route>
        </Routes>
      </div>
    </GoogleOAuthProvider>

  );
}

export default App;

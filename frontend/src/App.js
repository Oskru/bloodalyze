import React from 'react';
// import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Loginform from './components/loginform/Loginform';
import Registerform from './components/registerform/Registerform';
import Addresult from './components/addresult/Addresult';
import Notfound from './components/notfound/Notfound';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import BackgroundImage from './static/bg.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    minHeight: '100vh',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    fontFamily: 'Nunito',
    overflow: 'hidden',
  },
  spacer: {
    flex: 1,
  },
};
const colors = createTheme({
  palette: {
    primary: {
      main: '#db4d63',
      light: '#f5677d',
      dark: '#c2344a',
    },
  },
});

function App() {
  const [user, setUser] = React.useState(null);
  
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  return (
    <div style={styles.root}>
      <ThemeProvider theme={colors}>
        <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/login' element={<Loginform user={user} setUser={setUser} />}></Route>
            <Route exact path='/register' element={<Registerform user={user} setUser={setUser} />}></Route>
            {user 
            ? <Route exact path='/addresult' element={<Addresult user={user} />}></Route> 
            : <Route exact path='/addresult' element={<Registerform user={user} setUser={setUser} />}></Route>}
            <Route path='*' element={<Notfound />}></Route>
          </Routes>
          <div style={styles.spacer}></div>
          <Footer user={user} />
        </ThemeProvider>
    </div>
  );
}

export default App;

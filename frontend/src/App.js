import React from 'react';
// import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Loginform from './components/loginform/Loginform';
import Registerform from './components/registerform/Registerform';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import BackgroundImage from './static/bg.jpg';

const styles = {
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    fontFamily: 'Nunito',
    overflow: 'hidden',
  }
};

function App() {

  // Implement user login logic to other components
  const [user, setUser] = React.useState(null);
  
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  return (
    <div style={styles.root}>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/login' element={<Loginform user={user} setUser={setUser} />}></Route>
        <Route exact path='/register' element={<Registerform user={user} setUser={setUser} />}></Route>
      </Routes>
      <Footer user={user} />
    </div>
  );
}

export default App;

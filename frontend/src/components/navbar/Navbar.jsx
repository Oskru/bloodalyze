import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Box,
}
from '@mui/material';

import { NavLink, useNavigate } from 'react-router-dom';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { useEffect, useState } from 'react';

const styles = {
  appBar: {
    color: 'black',
    backgroundColor: '#db4d63',
    boxShadow: '0px 10px 10px 0px #2E2E2E',
    position: 'fixed',
  },

  // Fix the 64px (height of a Navbar component) position: fixed space taken
  appBarFixedFix: {
    height: 64,
    marginBottom: 30,
  },
};

function Navbar() {

  const [isLogged, setLogged] = useState(false);  

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogged(() => true);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogged(current => !current);
  }
  
  return (
    <>
    <AppBar style={styles.appBar}>
      <Toolbar>
        <Box sx={{ justifyContent: 'left', flexGrow: 1 }}>
          <IconButton LinkComponent={NavLink} to='/' size='large' edge='start' color='inherit' aria-label='logo' >
            <BloodtypeIcon />
          </IconButton>
        </Box>
        <Typography variant='h6' component='div' sx={{ flexGrow: 10000000, display: { xs: 'none', sm: 'block'} }}>
          BLOODALYZE
        </Typography>
        <Stack direction='row' justifyItems='self-end' alignItems='self-end' justifyContent='right' spacing={2}>
          <Button color='inherit'>Contact</Button>
          <Button color='inherit'>About</Button>
          { isLogged
            ? <Button onClick={handleLogout} to='/logout' color='inherit' variant='contained'>Logout</Button>
            : <Button LinkComponent={NavLink} to='/login' color='inherit' variant='contained'>Login</Button>
          }
          
        </Stack>
      </Toolbar>
    </AppBar>
    <div style={styles.appBarFixedFix}></div>
    </>
  );
}

export default Navbar;

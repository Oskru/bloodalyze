import React from 'react';
// TODO: Make footer links working
import { Box, Container, Grid, Link } from '@mui/material';

const styles = {
  root: {
    marginTop: '50px',
    width: '100%',
  },
};

// TODO: Make footer viable for my page (change links, grids, think of what i wanna put here)
function Footer(props) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    props.setUser((current) => !current);
  };

  return (
    <div style={styles.root}>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box pt={1}>
                <Link color="inherit">Contact</Link>
              </Box>
              <Box>
                <Link color="inherit">Support</Link>
              </Box>
              <Box>
                <Link color="inherit">Privacy</Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Account</Box>
              <Box pt={1}>
                {props.user ? (
                  <Link color="inherit" onClick={handleLogout}>
                    Logout
                  </Link>
                ) : (
                  <Link color="inherit" href="/login">
                    Login
                  </Link>
                )}
              </Box>
              <Box>
                <Link color="inherit" href="/register">
                  Register
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box pt={1}>
                <Link color="inherit">Contact</Link>
              </Box>
              <Box>
                <Link color="inherit">Support</Link>
              </Box>
              <Box>
                <Link color="inherit">Privacy</Link>
              </Box>
            </Grid>
          </Grid>

          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Made by Oskar Krupa, {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default Footer;

import React from 'react';
import { Typography, Button, Paper } from '@mui/material';

const styles = {
  root: {
    margin: '40px auto 0 auto',
    textAlign: 'center',
    padding: '50px 0 50px 0',
    width: '30%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    color: 'black',
  },
  status: {
    fontSize: '6rem',
    fontWeight: 'bold',
  },
  pgNotFd: {
    marginTop: '20px',
    fontSize: '2rem',
  },
  button: {
    width: '50%',
    marginTop: '30px',
  },
};

// TODO: Style this page
function Notfound() {
  return (
    <>
      <Paper style={styles.root} elevation={7}>
        <Typography variant='h1' style={styles.status}>
          404
        </Typography>
        <Typography variant='h1' component='h2' style={styles.pgNotFd}>
          Sorry, we can't find that page.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          href='/'
          style={styles.button}
          size='large'
        >
          Go to homepage
        </Button>
      </Paper>
    </>
  );
}

export default Notfound;

import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  Paper,
  Avatar,
  Grid,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  Link,
} from '@mui/material';

const colors = createTheme({
  palette: {
    primary: {
      main: '#db4d63',
      light: '#f5677d',
      dark: '#c2344a',
    },
  },
});

const styles = {
  root: {
    fontFamily: 'Nunito',
    overflow: 'hidden',
    height: '55vh',
  },

  mainGrid: {
    marginTop: '50px',
    marginBottom: '50px',
  },

  paperContainer: {
    height: '383px',
    width: '300px',
    margin: '20px auto',
    padding: '20px',
  },

  applyMargin: {
    marginBottom: '10px',
  },
};

function Loginform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const { error, setError } = useState('');

  const onSubmit = async (data) => {
    delete data.rememberPassword;

    try {
      const url = 'http://localhost:8000/api/auth';
      const { data: res } = await axios.post(url, data);
      localStorage.setItem('token', res.data);
      window.location = '/';
    } catch {
      if (
        error?.response &&
        error?.response.status >= 400 &&
        error?.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div style={styles.root}>
      <Grid style={styles.mainGrid}>
        <ThemeProvider theme={colors}>
          <Paper elevation={10} style={styles.paperContainer}>
            <Grid align="center">
              <Avatar
                sx={{
                  padding: '5px',
                  backgroundColor: '#db4d63',
                  color: 'black',
                }}
              >
                <LoginIcon fontSize="large" />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="E-mail"
                name="email"
                placeholder="Enter e-mail"
                variant="standard"
                type="email"
                style={styles.applyMargin}
                fullWidth
                {...register('email', { required: 'Login e-mail is required' })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                name="password"
                placeholder="Enter password"
                variant="standard"
                type="password"
                style={styles.applyMargin}
                fullWidth
                {...register('password', { required: 'Password is required' })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />

              <FormControlLabel
                control={<Checkbox name="rememberPassword" color="primary" />}
                label="Remember password"
                style={styles.applyMargin}
                {...register('rememberPassword')}
              />

              <Button
                type="submit"
                variant="contained"
                style={styles.applyMargin}
                fullWidth
              >
                Login
              </Button>
            </form>
            <Typography>
              <Link href="#">Forgot password?</Link>
            </Typography>
            <Typography>
              Want to register an account?&nbsp;&nbsp;
              <Link component={RouterLink} to="/register">
                Sign Up
              </Link>
            </Typography>
          </Paper>
        </ThemeProvider>
      </Grid>
    </div>
  );
}

export default Loginform;

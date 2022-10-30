import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Paper,
  Avatar,
  Grid,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from "react-router-dom";

// At least: 8 chars, 1 uppercase, 1 number
// Can contain special chars
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

// RFC2822 Email validation
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

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

  },

  paperContainer: {
    height: 'auto',
    width: '300px',
    margin: '20px auto',
    padding: '20px',
  },

  applyMargin: {
    marginBottom: '20px',
  },

  mainGrid: {
    marginTop: '55px',
  },

};

function Registerform() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  
  const {error, setError} = useState('');


  const onSubmit = async (data) => {
    delete data.confirmPassword;
    console.log(data);
    try {
      const url = 'http://localhost:8000/api/users';
      const {data: res} = await axios.post(url, data);
      navigate('/login');
      console.log(res.message);
    } catch {
      if(error?.response &&
        error?.response.status >= 400 &&
        error?.response.status <= 500
        ) {
        setError(error.response.data.message);
        }
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(current => !current);
  };
  
  return (
    <div style={styles.root}>
      <Grid style={styles.mainGrid}>
        <ThemeProvider theme={colors}>
          <Paper elevation={10} style={styles.paperContainer}>
            <Grid align='center'>
              <Avatar sx={{ padding: '5px', backgroundColor: '#db4d63', color: 'black' }}><LogoutIcon fontSize='large' /></Avatar>
              <h2>Sign Up</h2>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField 
              type='text' 
              label='First name' 
              placeholder='Enter first name' 
              name='firstName'
              variant='standard' 
              style={styles.applyMargin} 
              fullWidth 
              {...register('firstName', { required: 'First name is required'})}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
              />

              <TextField 
              type='text' 
              label='Last name' 
              placeholder='Enter last name'
              name='lastName'
              variant='standard' 
              style={styles.applyMargin} 
              fullWidth 
              {...register('lastName', { required: 'Last name is required'})}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
              />

              <TextField 
              label='E-mail'
              placeholder='Enter e-mail'
              name='email'
              variant='standard' 
              style={styles.applyMargin} 
              fullWidth 
              {...register('email', { required: 'E-mail is required', pattern: {value: EMAIL_REGEX, message: 'Please input a valid email address'}})}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              />

              <TextField 
              type='password' 
              label='Password' 
              placeholder='Enter password'
              name='password'
              variant='standard' 
              style={styles.applyMargin} 
              fullWidth 
              {...register('password', { required: 'Password is required', pattern: {value: PWD_REGEX, message: "Your password has to contain at least 8 characters, 1 uppercase letter and 1 number"} })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              />

              <TextField 
              type='password' 
              label='Password again'
              placeholder='Enter password again' 
              name='confirmPassword'
              variant='standard'
              style={styles.applyMargin} 
              fullWidth 
              {...register('confirmPassword', { required: true, validate: (val) => {
                if (watch('password') !== val) {
                  return "Your passwords do not match"
                }
              } })}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              />

              <FormControlLabel
                control = {
                  <Checkbox
                  name='terms'
                  color='primary'
                  value={isChecked}
                  onChange={handleChange}
                  />
                }
                label='I accept to the Terms & Conditions'
                style={styles.applyMargin}
                name='terms2'
                />
              <Button id='submitButton' type='submit' variant="contained" style={styles.applyMargin} fullWidth disabled={!isChecked}>Register an account</Button> 
            </form>
          </Paper>
        </ThemeProvider>
      </Grid>
    </div>
  );
};

export default Registerform;
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  IconButton,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import HappyMan from './happy-man.jpg';

const styles = {
  root: {
    minHeight: 'auto',
    marginTop: 200,
    fontFamily: 'Nunito',
  },

  welcomeBox: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    margin: 'auto',
  },

  welcomeText: {
    color: '#242424',
    fontSize: '4.6rem',
    textAlign: 'center',
    background: 'none',
    fontWeight: 'bolder',
  },

  scrollButton: {
    textAlign: 'center',
  },

  goDown: {
    fontSize: '4rem',
  },

  descriptionContainer: {
    marginTop: '800px',
  },

  blood: {
    color: 'rgba(154, 25, 25, 0.90)',
  },

  description: {
    height: '100%',
    padding: '10px 10px 0px 20px',
    background: 'rgba(255, 255, 255, 0.60)',
    color: 'black',
  },

  manImage: {
    width: '100%',
    height: 'auto',
  },

  descriptionTitle: {
    fontSize: '2.05rem',
    fontWeight: 'bold',
    paddingBottom: '20px',
  },

  descriptionContent: {
    fontSize: '1.5rem',
    paddingBottom: '10px',
  },

  underline: {
    textDecoration: 'underline',
  }
};


function Home() {

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, [])

  return (
    <div style={styles.root}>
      <Collapse
      in={checked}
      {...(checked ? { timeout: 2000 } : {})}
      collapsedSize={150}
      >
        <Box styles={styles.welcomeBox}>
          <h1 style={styles.welcomeText}>Welcome to<br /><span style={styles.blood}>blood</span>alyze.</h1>
        </Box>
        <Container style={styles.scrollButton}>
          <Scroll to='description' smooth={true}>
            <IconButton>
                <ExpandMoreIcon style={styles.goDown} />
            </IconButton>
          </Scroll>
        </Container>
      </Collapse>
      <Container id='description' style={styles.descriptionContainer}>
        <Grid container spacing={15} alignItems='flex-start'>
          <Grid item component='h2' xs={12} md={6} style={styles.test}>
            <div style={styles.imageBox}></div>
            <img src={HappyMan} alt='Happy man' style={styles.manImage}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={10} style={styles.description}>
              <div style={styles.descriptionTitle}>Why should you use this tool?</div>
              <article style={styles.descriptionContent}>Our analyzer makes tracking your blood count results extremely easy. You can look for which elements of blood you are supposed to supplement, look for blood components which go beyond the norm, track your results on your registered account and compare it to your previous results.<br /><br /><span style={styles.underline}>Start your conscious health care now!</span></article>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
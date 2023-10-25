import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
    },
  },
});

const Inicio = () => {
  const paperStyle = {
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'right',
  };

  const subtitleStyle = {
    fontSize: '18px',
    textAlign: 'right',
  };

  const ingresarButtonStyle = {
    ...buttonStyle,
    color: 'black',
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={paperStyle}>
              <div style={{ textAlign: 'right' }}>
                <div style={titleStyle}>
                  <Typography variant="h1" style={{ fontSize: '32px' }}>AMV</Typography>
                </div>
                <div style={subtitleStyle}>
                  <Typography variant="h2" style={{ fontSize: '18px' }}>Asistente médico virtual</Typography>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src="/inicio_fondo.jpg" alt="Fondo" style={{ width: '100%', height: 'auto' }} />
              </div>
              <div style={buttonContainerStyle}>
                <Button variant="contained" color="secondary" style={buttonStyle}>
                  Registrarse
                </Button>
                <Button variant="contained" color="primary" style={ingresarButtonStyle}>
                  Ingresar
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Inicio;
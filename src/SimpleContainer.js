import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Board from './Board';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="md" style={{padding: '0px'}}>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', padding: '10px', height: '100vh' }}>
        <Board/>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
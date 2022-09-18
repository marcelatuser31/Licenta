import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Checkbox, Stack } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const App = () :JSX.Element =>{
  return <div>
 <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>


    <Checkbox {...label} defaultChecked />
  </div>
}


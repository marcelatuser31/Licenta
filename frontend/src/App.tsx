import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Checkbox, Stack, styled, TextField } from '@mui/material';
import { color, fontFamily, style } from '@mui/system';
import { relative } from 'path';
import { useRoutes } from 'react-router-dom';
import { routes } from './Utils/routes';


 const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
 export const App = () =>{
      const navBarRoutes=useRoutes(routes)

  
      return navBarRoutes

}


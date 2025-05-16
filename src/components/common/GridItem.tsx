import React from 'react';
import { Grid, GridProps } from '@mui/material';

// This is a wrapper component to handle the breaking changes in MUI v7 Grid API
// In MUI v7, Grid with item prop requires a component prop
interface GridItemProps extends Omit<GridProps, 'item'> {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({ children, ...props }) => {
  return (
    <Grid component="div" item {...props}>
      {children}
    </Grid>
  );
};

export default GridItem; 
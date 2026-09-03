import { memo } from 'react';
import { Grid as MuiGrid } from '@mui/material';

const Grid = memo(({ children, columns = 12, spacing = 2, ...props }) => {
  return (
    <MuiGrid container spacing={spacing} {...props}>
      {children}
    </MuiGrid>
  );
});

Grid.displayName = 'Grid';

const GridItem = memo(({ children, xs = 12, sm, md, lg, ...props }) => {
  return (
    <MuiGrid item xs={xs} sm={sm} md={md} lg={lg} {...props}>
      {children}
    </MuiGrid>
  );
});

GridItem.displayName = 'GridItem';

export default Grid;
export { GridItem };

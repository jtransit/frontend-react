import { Box, Typography } from '@mui/material';

import { useMapContext } from '@contexts/map-context';

const RouteList = () => {
  const {
    directions: { routeInfo, routeIndex },
  } = useMapContext();

  const info = () => {
    return routeInfo.map((v, i) => {
      return (v?.routeName as any).map((v: any, i: number) => {
        return (
          <Box key={`info` + i} sx={{ background: 'white' }}>
            <Typography>{v}</Typography>
          </Box>
        );
      });
    });
  };

  return <>{info()}</>;
};

export default RouteList;

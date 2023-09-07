import { Box, Input, Divider } from '@mui/material';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useSpring, animated } from '@react-spring/web';

import { useAppContext } from '@contexts/app-context';
import { useMapContext } from '@contexts/map-context';
import _styles from './styles';

const styles = _styles.nav;

const NavigationMenu = () => {
  const { showDrawer, showNavigationMenu } = useAppContext();
  const { from, to, handleChangeFrom, handleChangeTo, handleBack, handleNext } =
    useMapContext();
  const props = useSpring({
    left: showDrawer ? styles.drawerOpen.left : styles.drawerClose.left,
    opacity: showNavigationMenu ? 1 : 0,
  });

  const _from = from?.address ?? '';
  const _to = to?.address ?? '';

  const AnimatedMenu = animated(Box);

  return (
    <AnimatedMenu sx={[styles.menu]} style={props}>
      <Box>
        <Box sx={styles.inputWrapper}>
          <TripOriginIcon sx={styles.origin} />
          <Input
            sx={styles.input}
            placeholder='Origin'
            onChange={handleChangeFrom}
            value={_from}
          />
        </Box>
        <Box sx={styles.dividerWrapper}>
          <Box sx={styles.moreWrapper}>
            <MoreVertIcon sx={styles.moreIcon} />
          </Box>
          <Divider sx={styles.divider} />
        </Box>
        <Box sx={styles.inputWrapper}>
          <TripOriginIcon sx={styles.destination} />
          <Input
            sx={styles.input}
            placeholder='Destination'
            onChange={handleChangeTo}
            value={_to}
          />
        </Box>
      </Box>
      <Box>
        <SwapVertIcon sx={styles.swapIcon} />
      </Box>
      {from !== undefined && to !== undefined && (
        // WIP UI
        <>
          <div className='py-1 space-x-1'>
            <button
              className='bg-sky-200 border-2 border-solid border-sky-500 p-1'
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className='bg-sky-200 border-2 border-solid border-sky-500 p-1'
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      )}
    </AnimatedMenu>
  );
};

export default NavigationMenu;

import { Box } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';

import { useAppContext } from '@contexts/app-context';
import NavigationMenu from './navigation-menu';
import RouteList from './route-list';
import _styles from './styles';

const styles = _styles.nav;

const NavigationWrapper = () => {
  const { showDrawer, showNavigationMenu } = useAppContext();

  const props = useSpring({
    left: showDrawer ? styles.drawerOpen.left : styles.drawerClose.left,
    opacity: showNavigationMenu ? 1 : 0,
  });

  const AnimatedMenu = animated(Box);

  return (
    <AnimatedMenu sx={styles.wrapper} style={props}>
      <NavigationMenu />
      <RouteList />
    </AnimatedMenu>
  );
};

export default NavigationWrapper;

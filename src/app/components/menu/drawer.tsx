'use client';
import { Box, Typography } from '@mui/material';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSpring, animated } from '@react-spring/web';

import { useAppContext } from '@contexts/app-context';
import AppIcon from '@assets/icons/app';
import _styles from './styles';

const styles = _styles.drawer;

const DrawerItem = ({
  icon,
  label,
  isSelected,
}: {
  icon: JSX.Element;
  label: string;
  isSelected: boolean;
}) => {
  const { showDrawer } = useAppContext();
  const props = useSpring({
    opacity: showDrawer ? 1 : 0,
  });

  const AnimatedTypography = animated(Typography);

  return (
    <Box sx={styles.item}>
      <Box
        sx={[
          { width: '100%' },
          isSelected && styles.itemIconWrapper,
          !isSelected && styles.itemIconWrapperNotSelected,
        ]}
      >
        <Box sx={[{ display: 'flex' }, showDrawer && styles.itemShow]}>
          {icon}
          {showDrawer && (
            <AnimatedTypography style={props}>{label}</AnimatedTypography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const Drawer = () => {
  const { showDrawer, handleShowDrawer } = useAppContext();
  const props = useSpring({
    width: showDrawer ? styles.open.width : styles.close.width,
  });

  const AnimatedDrawer = animated(Box);

  return (
    <Box sx={styles.wrapper}>
      <AnimatedDrawer sx={{ height: '1rem' }} style={props}>
        <Box sx={styles.appIconWrapper}>
          <Box sx={styles.icon} onClick={() => handleShowDrawer(!showDrawer)}>
            <AppIcon />
          </Box>
        </Box>
        <Box sx={styles.items}>
          <DrawerItem
            icon={<CottageOutlinedIcon />}
            label={'Home'}
            isSelected={true}
          />
          <DrawerItem
            icon={<SettingsOutlinedIcon />}
            label={'Settings'}
            isSelected={false}
          />
        </Box>
      </AnimatedDrawer>
    </Box>
  );
};

export default Drawer;

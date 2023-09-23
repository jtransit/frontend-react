import { useMemo } from 'react';
import { Box, Divider } from '@mui/material';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import { useMapContext } from '@contexts/map-context';
import AutoCompleteComponent from './autocomplete';
import _styles from './styles';

const styles = _styles.nav;

const NavigationMenu = () => {
  const {
    directions: {
      search: { isLoading: isLoadingSearch, list },
      location: { from, to },
      handleChangeFrom,
      handleChangeTo,
      handleBack,
      handleNext,
    },
  } = useMapContext();

  const options = useMemo(
    () =>
      list.map((v) => {
        return {
          center: v.center,
          label: v.place_name,
        };
      }),
    [list]
  );

  return (
    <Box sx={[styles.menu]}>
      <Box>
        <Box sx={styles.inputWrapper}>
          <TripOriginIcon sx={styles.origin} />
          <AutoCompleteComponent
            isLoading={isLoadingSearch}
            options={options}
            placeholder='Directions from'
            value={{
              center: [from.latLng?.lng ?? 0, from.latLng?.lat ?? 0],
              label: from.address,
            }}
            changeHandler={handleChangeFrom}
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
          <AutoCompleteComponent
            isLoading={isLoadingSearch}
            options={options}
            placeholder='Directions to'
            value={{
              center: [to.latLng?.lng ?? 0, to.latLng?.lat ?? 0],
              label: to.address,
            }}
            changeHandler={handleChangeTo}
          />
        </Box>
      </Box>
      <Box>
        <SwapVertIcon sx={styles.swapIcon} />
      </Box>
      {from?.latLng !== undefined && to?.latLng !== undefined && (
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
    </Box>
  );
};

export default NavigationMenu;

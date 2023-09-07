import { useState } from 'react';
import { AppContextProps } from '@app-types/app-context';

const useAppContextState: () => AppContextProps = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [showDrawer, setShowDrawer] = useState(false);

  const [showNavigationMenu, setShowNavigationMenu] = useState(true);

  const handleLoading = (v: boolean) => {
    setIsLoading(v);
  };

  const handleShowDrawer = (v: boolean) => {
    setShowDrawer(v);
  };

  const handleShowNavigationMenu = (v: boolean) => {
    setShowNavigationMenu(v);
  };

  return {
    isLoading,
    showDrawer,
    showNavigationMenu,
    handleLoading,
    handleShowDrawer,
    handleShowNavigationMenu,
  };
};

export default useAppContextState;

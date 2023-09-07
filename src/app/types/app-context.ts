import { ReactNode } from 'react';

export interface AppContextProps {
  isLoading: boolean;
  showDrawer: boolean;
  showNavigationMenu: boolean;
  handleLoading: (value: boolean) => void;
  handleShowDrawer: (value: boolean) => void;
  handleShowNavigationMenu: (value: boolean) => void;
}

export const defaultAppContext: AppContextProps = {
  isLoading: false,
  showDrawer: false,
  showNavigationMenu: false,
  handleLoading: () => {},
  handleShowDrawer: () => {},
  handleShowNavigationMenu: () => {},
};

export interface AppContextProviderProps {
  children: ReactNode;
}

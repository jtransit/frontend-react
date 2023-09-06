import { useMapContext } from '@contexts/map-context';
import ContextMenuItem from './context-menu-item';

export const ContextMenu = () => {
  const {
    isContextMenuOpen,
    containerPoint,
    action,
    handleSetFrom,
    handleSetTo,
    handleClear,
  } = useMapContext();

  return (
    <>
      {isContextMenuOpen && (
        <div
          style={{
            position: 'absolute',
            zIndex: 400,
            width: '8rem',
            height: 'auto',
            border: '1px solid gray',
            borderRadius: '5px',
            padding: '0.3rem',
            background: 'white',
            top: `${containerPoint.y}px`,
            left: `${containerPoint.x}px`,
          }}
        >
          <ul>
            <ContextMenuItem
              name='Directions from here'
              handler={handleSetFrom}
            />
            <ContextMenuItem name='Directions to here' handler={handleSetTo} />
            <ContextMenuItem name='Clear' handler={handleClear} />
          </ul>
        </div>
      )}
    </>
  );
};

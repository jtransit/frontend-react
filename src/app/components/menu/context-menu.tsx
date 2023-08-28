import { useMapContext } from '@contexts/map-context';
import Item from './item';

export const ContextMenu = () => {
  const {
    isContextMenuOpen,
    containerPoint,
    action,
    handleAddFrom,
    handleAddTo,
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
            <Item name='Directions from here' handler={handleAddFrom} />
            <Item name='Directions to here' handler={handleAddTo} />
            <Item name='Clear' handler={handleClear} />
          </ul>
        </div>
      )}
    </>
  );
};

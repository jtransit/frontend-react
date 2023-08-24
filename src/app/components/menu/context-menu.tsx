import { useMapContext } from '@contexts/map-context';

export const Menu = () => {
  const { isContextMenuOpen, containerPoint, action } = useMapContext();

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
            <li>
              {action === undefined && (
                <a
                  id='context-menu-add-marker'
                  onClick={() => {}}
                  style={{ cursor: 'pointer' }}
                >
                  Directions from here
                </a>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

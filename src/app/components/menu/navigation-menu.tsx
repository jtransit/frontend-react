import { useMapContext } from '@contexts/map-context';

// WIP Navigation Menu
const NavigationMenu = () => {
  const { from, to, handleNext, handleBack } = useMapContext();

  const _from = from?.toString() ?? '';
  const _to = to?.toString() ?? '';

  return (
    <>
      <div
        style={{
          position: 'absolute',
          zIndex: 400,
          width: '25rem',
          height: 'auto',
          border: '1px solid gray',
          borderRadius: '5px',
          padding: '0.3rem',
          background: 'white',
          top: `1rem`,
          left: `1rem`,
        }}
      >
        <div>Where are you? {_from}</div>
        <div>Where do you want to go? {_to}</div>
        <div>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;

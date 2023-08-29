import { useMapContext } from '@contexts/map-context';

// WIP Navigation Menu
const NavigationMenu = () => {
  const { from, to, handleNext, handleBack } = useMapContext();

  const _from = from?.toString() ?? '';
  const _to = to?.toString() ?? '';

  return (
    <>
      <div className='absolute z-[400] w-[25rem] h-auto border-2 border-solid border-gray-400 rounded p-[0.3rem] bg-white top-[1rem] left-[1rem]'>
        <div className='py-1'>Where are you? {_from}</div>
        <div className='py-1'>Where do you want to go? {_to}</div>
        {from !== undefined && to !== undefined && (
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
      </div>
    </>
  );
};

export default NavigationMenu;

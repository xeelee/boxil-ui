import { useEffect } from 'react';

function useKeyboard(nes, keysMapping) {
  useEffect(() => {
    const keyDownListener = (event) => {
      for (const key in keysMapping) {
        if (event.key === key) nes.buttonDown(1, keysMapping[key]);
      }
    }
    const keyUpListener = (event) => {
      for (const key in keysMapping) {
        if (event.key === key) nes.buttonUp(1, keysMapping[key]);
      }
    }
    document.addEventListener('keydown', keyDownListener);
    document.addEventListener('keyup', keyUpListener);
    return () => {
      document.removeEventListener('keydown', keyDownListener);
      document.removeEventListener('keyup', keyUpListener);
    };
  }, [nes, keysMapping]);
}

export default useKeyboard;

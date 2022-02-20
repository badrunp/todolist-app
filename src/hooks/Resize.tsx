import { useEffect, useState } from 'react';

function Resize() {
  const [{ width, height }, setResize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let unsubcribe = true;
    if (unsubcribe) {
      window.addEventListener('resize', () => {
        setResize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    }

    return () => {
      unsubcribe = false;
    };
  }, []);

  return {
    width,
    height,
  };
}

export default Resize;

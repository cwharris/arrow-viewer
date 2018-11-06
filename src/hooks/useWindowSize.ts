import * as React from 'react';

export function useWindowSize(): [{ width: number, height: number }] {
    const [size, setSize] = React.useState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  
    React.useEffect(() => {
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
      function onResize(this: Window) {
        setSize({
          width: this.innerWidth,
          height: this.innerHeight
        });
      }
      
    }, []);
  
    return [size];
  }
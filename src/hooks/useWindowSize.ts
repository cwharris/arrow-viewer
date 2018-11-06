import * as React from 'react';

export function useWindowSize(): [{ width: number, height: number }] {
    const [size, setSize] = React.useState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  
    React.useEffect(() => {
      window.onresize = () => setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
    }, []);
  
    return [size];
  }
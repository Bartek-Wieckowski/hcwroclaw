import { useRef, useEffect, RefObject } from 'react';

function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  listenCapturing = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref as RefObject<T>;
}

export default useClickOutside;

import { useEffect } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    let isMounted = true;

    // Wrap the framework ready call in a check for mounted state and function existence
    const callFrameworkReady = () => {
      if (isMounted && typeof window !== 'undefined' && typeof window.frameworkReady === 'function') {
        try {
          window.frameworkReady();
        } catch (error) {
          // Silently handle any errors to prevent crashes
          console.warn('Framework ready call failed:', error);
        }
      }
    };

    // Delay the initial call slightly to ensure proper mounting
    const timeoutId = setTimeout(callFrameworkReady, 0);

    // Cleanup function to prevent updates after unmount
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array since this should only run once
}
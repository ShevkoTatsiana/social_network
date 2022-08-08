import React, {useState, useEffect} from 'react';

export const useIsOffline = () => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        window.addEventListener("offline", () => {
            setIsOffline(true);
        });
        window.addEventListener("online", () => {
            setIsOffline(false);
        });
    
        return () => {
          window.removeEventListener("offline", () => {
            setIsOffline(true);
          });
          window.removeEventListener("online", () => {
            setIsOffline(false);
          });
        };
      }, []);

      return isOffline;
}
"use client"
import { useRef, useEffect } from 'react';

export default function useClickOutside(callback:() => void) {
  const boxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (e:any) => {
      if(boxRef.current && !boxRef.current.contains(e.target)){
        callback();
      };
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  });
  
  return [boxRef];
}
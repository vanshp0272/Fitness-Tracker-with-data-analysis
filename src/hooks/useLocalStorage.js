import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if(jsonValue) return JSON.parse(jsonValue);
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
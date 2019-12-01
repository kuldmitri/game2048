import React, { useState, useEffect } from 'react';

export const useKeyDownHandler = (keydownHandler) => {
  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);
};

export const useUpdate = () => {
  const [state, setState] = useState(null);
  const update = () => {
    setState(+new Date());
  };

  return {
    update
  };
};


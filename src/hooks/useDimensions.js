import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export default function useDimensions() {
    const [screenData, setScreenData] = useState(Dimensions.get('screen'));

    useEffect(() => {
      const onChange = (result) => {
        let res = result.screen;
        const {width} = Dimensions.get('window');
        setScreenData({...res, width});
      };
  
      const subscription  = Dimensions.addEventListener('change', onChange);
  
      return () => subscription.remove()
    });
  
    return {
      ...screenData,
      isLandscape: screenData.width > screenData.height,
    };
}

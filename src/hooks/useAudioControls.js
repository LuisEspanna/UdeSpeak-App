import React, { useState } from 'react';

export default function useAudioControls() {

    const [showAudioCtrl, setshowAudioCtrl] = useState(false);

    const handleAudioButton = () => {
        setshowAudioCtrl(!showAudioCtrl);
    }

  return {
    showAudioCtrl,
    handleAudioButton
  }
}

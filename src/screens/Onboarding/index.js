import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import slides from './functions/slides';
import OnboardingItem  from './helpers/OnboardingItem';
import Paginator from './helpers/paginator';
import SkipButton from './helpers/SkipButton';

export default function Onboarding({ onFinish }) {
  const [index, setIndex] = useState(0);

  const onNext = () => {
    setIndex(index < 2 ? index + 1: 0);

    if(onFinish && index + 1 === 3) onFinish() 
  };

  return (
    <View  style={styles.container}>
      <OnboardingItem item={slides[index]}/> 
      <Paginator currentPage={index} slides={slides}/>      
      <View style={styles.nextButton}>
        <SkipButton onPress={onNext} value={(index/slides.length)*100 + (100/slides.length)}/>
      </View>  
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nextButton: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',    
  }
});

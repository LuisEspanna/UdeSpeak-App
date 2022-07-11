import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import { useState, useRef } from 'react';

import slides from './functions/slides';
import OnboardingItem  from './helpers/OnboardingItem';
import Paginator from './helpers/paginator';
import SkipButton from './helpers/SkipButton';
import HeaderIcon from "./helpers/icons/HeaderIcon";

const {width, height} = Dimensions.get('window');

export default function OnboardingScreen({ onFinish }) {
  const [index, setIndex] = useState(0);

  const ref = useRef();

  const onNext = () => {
    setIndex(index < 2 ? index + 1: 0);

    if(onFinish && index + 1 === 3) onFinish() 
  };

  return (
    <View style={styles.container}>
      <HeaderIcon/>
        
      <FlatList
        ref={ref}
        data={slides}
        contentContainerStyle={styles.flatList}
        horizontal
        showsVerticalScrollIndicator={false}
        pagingEnabled
        renderItem={({item}) => 
          <OnboardingItem item={item}/>
        }
      />

      <Paginator slides={slides} currentPage={index}/>
 
      <View style={styles.nextButton}>
        <SkipButton onPress={onNext} value={(index/slides.length)*100 + (100/slides.length)}/>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 2,
    alignItems: 'center'
  },
  nextButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',    
  }
});

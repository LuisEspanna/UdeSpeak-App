import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import { useState, useRef } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage'
import slides from './functions/slides';
import OnboardingItem  from './helpers/OnboardingItem';
import Paginator from './helpers/paginator';
import SkipButton from './helpers/SkipButton';
import HeaderIcon from "./helpers/icons/HeaderIcon";
import { sleep } from '../../services/functions'

const {width, height} = Dimensions.get('window');
const lstIndex = slides.map((item, index) => index * width)

export default function OnboardingScreen({navigation, onFinish}) {
  const [index, setIndex] = useState(0);
  const [skipButtonValue, setSkipButtonValue] = useState(0);

  const ref = useRef();

  const { storeData } = useLocalStorage()

  const onNext = async() => {
    const nextSlideIndex = index + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setIndex(index + 1);
    }

    if(index + 1 === 3) {
      for (let i = skipButtonValue; i < 100; i++) {
        await sleep(10)
        setSkipButtonValue(i)
      }
      await storeData('onboarding', 'true')
      //navigation.replace('')
      onFinish()
    }
  };

  const onScroll = e => {    
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    
    if(lstIndex.includes(contentOffsetX)) {
      setIndex(currentIndex)
    }

    setSkipButtonValue(((e.nativeEvent.contentOffset.x*100)/(lstIndex.length*width)))
  };

  return (
    <View style={styles.container}>
      <HeaderIcon/>
        
      <FlatList
        keyExtractor={(item) => item.id }
        ref={ref}
        onScroll={onScroll}  
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
        <SkipButton
          onPress={onNext}
          value={skipButtonValue}
        />
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

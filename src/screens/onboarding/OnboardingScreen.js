import React, { useState, useRef, useEffect } from 'react';
import { FlatList, StyleSheet, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { localStorageSet, sleep } from '../../functions'
import { slides } from './constants';
import OnboardingItem from './helpers/OnboardingItem';
import Paginator from './helpers/paginator/Paginator';
import SkipButton from './helpers/SkipButton';
import HeaderIcon from "../../components/icons/HeaderIcon";


export default function OnboardingScreen({ navigation, onFinish }) {
  const [index, setIndex] = useState(0);
  const [skipButtonValue, setSkipButtonValue] = useState(0);
  const [width, setwidth] = useState(Dimensions.get('window').width);

  const ref = useRef();
  const lstIndex = slides.map((item, index) => index * width);

  useEffect(() => {
    const onChange = () => {
      const { width, height } = Dimensions.get('window');
      const offset = index * width;

      setwidth(width);
      ref?.current.scrollToOffset({ offset });
    };

    const subscription  = Dimensions.addEventListener('change', onChange);

    return () => subscription.remove()
  });
  

  const onNext = async () => {
    const nextSlideIndex = index + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setIndex(index + 1);
    }

    if (index + 1 === 3) {
      for (let i = skipButtonValue; i < 100; i++) {
        await sleep(10)
        setSkipButtonValue(i)
      }
      await localStorageSet('onboarding', 'true')
      //navigation.replace('')
      if(onFinish)onFinish()
    }
  };

  const onScroll = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);

    setIndex(currentIndex)
    setSkipButtonValue(((e.nativeEvent.contentOffset.x * 100) / (lstIndex.length * width)))
  };

  const renderItem = ({ item }) => (
    <OnboardingItem item={item} width={width} />
  );

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{height: '100%'}}>
        <HeaderIcon />

        <View style={{flex: 2}}>
          <FlatList
            keyExtractor={(item) => item.id}
            ref={ref}
            onScroll={onScroll}
            data={slides}
            contentContainerStyle={styles.flatList}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            renderItem={renderItem}
          />
        </View>
        <Paginator slides={slides} currentPage={index} />
        <View style={styles.nextButton}>
          <SkipButton
            onPress={onNext}
            value={skipButtonValue/100}
          />
        </View>
      </SafeAreaView >
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FBFF',
    width: '100%'
  },
  flatList: {
    //flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  nextButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
});
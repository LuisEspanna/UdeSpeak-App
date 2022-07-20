import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import { localStorageSet, sleep } from '../../functions'
import { slides } from './constants';
import OnboardingItem from './helpers/OnboardingItem';
import Paginator from './helpers/paginator/Paginator';
import SkipButton from './helpers/SkipButton';
import HeaderIcon from "../../components/icons/HeaderIcon";


const { width } = Dimensions.get('window');
const lstIndex = slides.map((item, index) => index * width);

export default function OnboardingScreen({ navigation, onFinish }) {
  const [index, setIndex] = useState(0);
  const [skipButtonValue, setSkipButtonValue] = useState(0);

  const ref = useRef();

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
      onFinish()
    }
  };

  const onScroll = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);

    setIndex(currentIndex)
    setSkipButtonValue(((e.nativeEvent.contentOffset.x * 100) / (lstIndex.length * width)))
  };

  const renderItem = ({ item }) => (
    <OnboardingItem item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderIcon />

      <FlatList
        keyExtractor={(item) => item.id}
        ref={ref}
        onScroll={onScroll}
        data={slides}
        contentContainerStyle={styles.flatList}
        horizontal
        showsVerticalScrollIndicator={false}
        pagingEnabled
        renderItem={renderItem}
      />


      {
        /*
        
        */
      }
      <Paginator slides={slides} currentPage={index} />
      <View style={styles.nextButton}>
        <SkipButton
          onPress={onNext}
          value={skipButtonValue}
        />
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FBFF'
  },
  flatList: {
    //flex: 2,
    alignItems: 'center',
  },
  nextButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
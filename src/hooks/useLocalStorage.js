import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useLocalStorage() {
    
    const storeData = async (key,value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
            console.log(e)
        }
    }

    const getData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key)
          return eval(value)
        } catch(e) {
          // error reading value
          console.log(e)
          return null
        }
      }


    return {
        storeData,
        getData
    }
}

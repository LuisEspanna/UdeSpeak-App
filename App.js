import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import store from './src/state/store';
import Login from './src/screens/Login'

export default function App() {
  return (
    <Provider store={store}>
      <Login/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import Reactotron from 'reactotron-react-native';

Reactotron.configure({ // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  name: 'Final Form React Native',
}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

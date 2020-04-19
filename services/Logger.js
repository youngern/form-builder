import Reactotron from 'reactotron-react-native';

export default class Logger {
  static log = (...args) => {
    Reactotron.log(...args);
  };
}

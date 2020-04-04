import AsyncStorage from '@react-native-community/async-storage';

const key = '@storage/form';

const get = async () => {
  try {
    const item = await AsyncStorage.getItem(key);
    return JSON.parse(item);
  } catch (e) {
    return null;
  }
}

const set = async (value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    return null;
  }
}


module.exports = {
  get,
  set,
};

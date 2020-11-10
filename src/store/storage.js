import AsyncStorage from '@react-native-community/async-storage';

export const KEY_BARBAR = '@barbar_bphtb';

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem(KEY_BARBAR, value);
  } catch (e) {
    // saving error
  }
};

export const storeObjData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(KEY_BARBAR, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem(KEY_BARBAR);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};


export const getObjData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEY_BARBAR);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeValue = async () => {
  try {
    await AsyncStorage.removeItem(KEY_BARBAR)
  } catch(e) {
    // remove error
  }
}

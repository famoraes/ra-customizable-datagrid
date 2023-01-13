import get from 'lodash/get';

const STORAGE_KEY = 'raColumnsConfig';

// Very basic storage helper
// values are stored in browser localStorage

const getRootValue = () => {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '');
  } catch (e) {
    return undefined;
  }
};

const setRootValue = (value: Record<string, any>) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (e) {
    console.log('Error setting value');
  }
};

export const getValueFromLocalStorage = (key: string) => get(getRootValue(), key);

export const setValueInLocalStorage = (key: string, value: Record<string, any>) =>
  setRootValue({
    ...getRootValue(),
    [key]: value
  });

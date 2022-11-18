import {Dimensions} from 'react-native';

export const dimensions = {
  window: Dimensions.get('window'),
  screen: Dimensions.get('screen'),
  hitSlop: {
    default: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  },
};

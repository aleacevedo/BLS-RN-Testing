import { StyleSheet } from 'react-native';
import { green, black } from '@constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  home: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 3
  },
  nfts: {
    marginTop: 10,
    backgroundColor: black
  }
});

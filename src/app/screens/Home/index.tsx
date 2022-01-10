import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import React, { useCallback, memo } from 'react';
import { getAllNFTS } from '@psychedelic/dab-js';
import { fetch } from 'react-native-fetch-api';
import { HttpAgent } from '@dfinity/agent';
import CustomButton from '@components/CustomButton';
import { actionCreators as AuthActions } from '@redux/auth/actions';

import styles from './styles';

const PLUG_PROXY_HOST = 'https://mainnet.plugwallet.ooo/';
const DFX_HOST = 'https://ic0.app/';

function Home() {
  const dispatch = useDispatch();
  const handleLogout = useCallback(
    () => dispatch(AuthActions.logout()),
    [dispatch]
  );

  const handleGetNFTs = async () => {
    const agent = new HttpAgent({
      host: DFX_HOST || PLUG_PROXY_HOST,
      fetch
    });
    const info = await getAllNFTS({ agent });
    console.log('agent: ', agent);
    console.log('info', info);
  };

  return (
    <View style={styles.container}>
      <CustomButton
        onPress={handleLogout}
        green
        title="Logout!"
        style={styles.home}
      />
      <CustomButton
        green
        title="GET NFTs"
        style={styles.nfts}
        onPress={handleGetNFTs}
      />
    </View>
  );
}

export default memo(Home);
